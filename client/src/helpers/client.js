/* eslint-disable no-underscore-dangle */
import AsyncStorage from "@react-native-community/async-storage";
import ApolloClient from "apollo-client";
import { setContext } from "apollo-link-context";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import { ApolloLink, split } from "apollo-link";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import OfflineLink from "./offlineLink";
import fetchFragmentTypes from "./introspectFragmentMatch";

// export default class ApolloGraphQLClient {

//   authMiddleware = setContext(() =>
//     AsyncStorage.getItem("Meteor.loginToken").then(loginToken => {
//       console.log("header logintoken", loginToken);
//       return {
//         headers: {
//           "meteor-login-token": loginToken
//         }
//       };
//     })
//   );

//   async init() {
//     const { data: introspectionQueryResultData } = await fetchFragmentTypes(
//       "http://192.168.0.118:3000/graphql"
//     );

//     const fragmentMatcher = new IntrospectionFragmentMatcher({
//       introspectionQueryResultData
//     });

//     const cache = new InMemoryCache({
//       dataIdFromObject: object => {
//         return object._id || null;
//       },
//       fragmentMatcher
//     });

//     const wsLink = new WebSocketLink({
//       uri: `ws://192.168.0.118:3000/graphql`,
//       options: {
//         reconnect: true,
//         connectionParams: () => {
//           return AsyncStorage.getItem("Meteor.loginToken").then(loginToken => {
//             console.log("loginToken", loginToken);
//             return {
//               "meteor-login-token": loginToken
//             };
//           });
//         }
//       }
//     });

//     offlineLink = new OfflineLink({
//       storage: AsyncStorage
//     });

//     offLink = ApolloLink.from([
//       offlineLink,
//       createUploadLink({ uri: "http://192.168.0.118:3000/graphql" })
//     ]);

//     // const httpLink = new HttpLink({
//     //   uri: "http://192.168.0.118:3000/graphql"
//     // });

//     const link = split(
//       // split based on operation type
//       ({ query }) => {
//         const definition = getMainDefinition(query);
//         return (
//           definition.kind === "OperationDefinition" &&
//           definition.operation === "subscription"
//         );
//       },
//       wsLink,
//       offLink
//     );

//     await persistCache({
//       cache,
//       storage: AsyncStorage,
//       maxSize: false,
//       debug: true
//     });

//     const client = new ApolloClient({
//       link: this.authMiddleware.concat(link),
//       cache,
//       defaultOptions: {
//         watchQuery: {
//           fetchPolicy: "cache-and-network",
//           errorPolicy: "all"
//         },
//         query: {
//           fetchPolicy: "cache-and-network",
//           errorPolicy: "all"
//         },
//         mutate: {
//           errorPolicy: "all"
//         }
//       }
//     });

//     offlineLink.setup(client);
//     return client;
//   }
// }

export const offlineLink = new OfflineLink({
  storage: AsyncStorage
});

const authMiddleware = setContext(() =>
  AsyncStorage.getItem("Meteor.loginToken").then(loginToken => {
    console.log("header logintoken", loginToken);
    return {
      headers: {
        "meteor-login-token": loginToken
      }
    };
  })
);

export default async function init() {
  const { data: introspectionQueryResultData } = await fetchFragmentTypes(
    "https://retrospect.space/graphql"
  );
  console.log("introspectionQueryResultData", introspectionQueryResultData);
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  });

  const cache = new InMemoryCache({
    dataIdFromObject: object => {
      return object._id || null;
    },
    fragmentMatcher
  });

  const wsLink = new WebSocketLink({
    uri: `wss://retrospect.space/graphql`,
    options: {
      reconnect: true,
      connectionParams: () => {
        return AsyncStorage.getItem("Meteor.loginToken").then(loginToken => ({
          "meteor-login-token": loginToken
        }));
      }
    }
  });


  offLink = ApolloLink.from([
    offlineLink,
    createUploadLink({ uri: "https://retrospect.space/graphql" })
  ]);

  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      console.log("query", query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    offLink
  );

  await persistCache({
    cache,
    storage: AsyncStorage,
    maxSize: false,
    debug: true
  });

  const client = new ApolloClient({
    link: authMiddleware.concat(link),
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all"
      },
      query: {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all"
      },
      mutate: {
        errorPolicy: "all"
      }
    }
  });

  offlineLink.setup(client);
  return client;
}
