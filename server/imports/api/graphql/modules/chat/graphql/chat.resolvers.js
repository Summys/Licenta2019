import { iteratorWrapper } from "/imports/api/graphql/modules/pubSub";
import pubSubEvents from "/imports/api/graphql/modules/pubSub/pubSub.events";
import { gqlEventRelation } from "./utils";
import { chatSubscriptionHooks } from "./hooks";

const { CHAT_UPDATE } = pubSubEvents;

// triggerFn - pe event CHAT_UPDATE 
export default {
  ChatEventType: {
    __resolveType(obj) {
      return gqlEventRelation[obj.type];
    }
  },
  Subscription: {
    chat: {
      subscribe: iteratorWrapper({
        onConnect: (_, args, { userId }) => {
          console.log("userId on connect", userId);
          return chatSubscriptionHooks.onConnect(_, args, { userId });
        },
        onDisconnect: (_, args, { userId }) => {
          return chatSubscriptionHooks.onDisconnect(_, args, { userId });
        },
        filterFn: (payload, variables, { userId }) => {
          const { receiverUserIdList = [] } = payload;
          console.log("payload", payload);

          console.log("userid", userId);
          return receiverUserIdList.includes(userId);
        },
        triggerFn: (_, args, { userId }) => {
          return CHAT_UPDATE;
        }
      })
    }
  }
};
