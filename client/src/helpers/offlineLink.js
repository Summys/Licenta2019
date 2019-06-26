import { ApolloLink, Observable } from "apollo-link";
import uuidv4 from "uuid/v4";
import gql from "graphql-tag";
import { ReactNativeFile } from "apollo-upload-client";

const syncStatusQuery = gql`
  query syncStatus {
    mutations
    inflight
  }
`;

export default class OfflineLink extends ApolloLink {
  constructor({ storage }) {
    super();

    if (!storage) {
      throw new Error("Storage is required ");
    }

    this.storage = storage;
    this.queue = new Map();
  }

  request(operation, forward) {
    this.updateStatus(false);
    const context = operation.getContext();
    const { query, variables } = operation || {};
    if (context.isQuery) {
      return new Observable(observer => {
        const subscription = forward(operation).subscribe({
          next: result => {
            observer.next(result);
          },
          error: async error => {
            console.log("error", error);
            const data = this.client.readQuery({
              query,
              variables
            });
            console.log("data", data);
            observer.next({
              data,
              error
            });
            observer.complete();
          },
          complete: () => {
            observer.complete();
          }
        });
        return () => {
          subscription.unsubscribe();
        };
      });
    }

    if (context.skip) {
      return forward(operation);
    }

    if (!context.optimisticResponse) {
      return new Observable(observer => {
        const subscription = forward(operation).subscribe({
          next: result => {
            observer.next(result);
          },
          error: async () => {
            observer.complete();
          },
          complete: () => observer.complete()
        });
        return () => {
          subscription.unsubscribe();
        };
      });
    }

    return new Observable(observer => {
      const attempt = {
        mutation: query,
        variables,
        optimisticResponse: context.optimisticResponse,
        context: {
          type: context.type,
          replaceId: context.replaceId,
          operationName: operation.operationName
        }
      };
      const attemptId = this.add(attempt);

      const subscription = forward(operation).subscribe({
        next: result => {
          this.remove(attemptId);
          observer.next(result);
        },

        error: async () => {
          observer.next({
            data: context.optimisticResponse,
            dataPresent: true,
            errors: []
          });
          observer.complete();
        },
        complete: () => observer.complete()
      });

      return () => {
        subscription.unsubscribe();
      };
    });
  }

  getQueue() {
    return this.storage
      .getItem("@offlineLink")
      .then(stored => new Map(JSON.parse(stored)) || new Map())
      .catch(() => new Map());
  }

  saveQueue() {
    this.storage.setItem("@offlineLink", JSON.stringify([...this.queue]));
    this.updateStatus(false);
  }

  updateStatus(inflight) {
    console.log("this.client", this.client);
    this.client.writeQuery({
      query: syncStatusQuery,
      data: {
        __typename: "SyncStatus",
        mutations: this.queue.size,
        inflight
      }
    });
  }

  add(item) {
    const attemptId = uuidv4();
    this.queue.set(attemptId, item);
    this.saveQueue();

    return attemptId;
  }

  remove(attemptId) {
    this.queue.delete(attemptId);
    this.saveQueue();
  }

  updateIds(attemptMutation, { data }) {
    const { queue } = this;
    const attempts = Array.from(queue);
    const { operationName, replaceId } = attemptMutation.context;
    const optimisticId = attemptMutation.optimisticResponse[operationName]._id;
    for (const [attemptId, attempt] of attempts) {
      if (optimisticId === attempt.variables[replaceId]) {
        const item = {
          ...attempt,
          variables: {
            ...attempt.variables,
            [replaceId]: data[operationName]._id
          }
        };
        queue.delete(attemptId);
        queue.set(attemptId, item);
      }
    }
  }

  async preSync() {
    const { queue } = this;
    const attempts = Array.from(queue);
    for (const [attemptId, attempt] of attempts) {
      if (attempt.context.type === "isUpload") {
        const file = new ReactNativeFile({ ...attempt.variables.file });
        const result = await this.client.mutate({
          ...attempt,
          variables: { file },
          optimisticResponse: undefined,
          ignoreResults: true
        });
        if (result) {
          queue.delete(attemptId);
          console.log("attempt, result", attempt, result);
          // this.updateIds(attempt, result);
        } else {
          break;
        }
      }
      if (attempt.context.type === "isCreate") {
        const result = await this.client.mutate({
          ...attempt,
          optimisticResponse: undefined,
          ignoreResults: true
        });
        // if (result) {
        //   queue.delete(attemptId);
        //   console.log("attempt, result", attempt, result);
        //   this.updateIds(attempt, result);
        // } else {
        //   break;
        // }
      }
    }
  }

  async sync() {
    const { queue } = this;
    if (queue.size < 1) {
      this.updateStatus(false);
      return;
    }
    this.updateStatus(true);
    await this.preSync();
    const attempts = Array.from(queue);
    for (const [attemptId, attempt] of attempts) {
      const result = await this.client.mutate({
        ...attempt,
        optimisticResponse: undefined,
        ignoreResults: true
      });
      if (result) {
        queue.delete(attemptId);
        this.updateStatus(true);
      } else {
        break;
      }
    }
    this.saveQueue();
  }

  async setup(client) {
    this.client = client;
    this.queue = await this.getQueue();
  }
}

export { syncStatusQuery };
