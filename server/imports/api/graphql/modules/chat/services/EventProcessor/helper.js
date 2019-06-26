// domain imports
import { pubSub } from '/imports/api/graphql/modules/pubSub';
import pubSubEvents from '/imports/api/graphql/modules/pubSub/pubSub.events';

const { CHAT_UPDATE } = pubSubEvents;

const publishChatSubscriptionEvent = (receiverUserIdList, payload) => {
    pubSub.publish(CHAT_UPDATE, { chat: payload, receiverUserIdList });
};

export {
    publishChatSubscriptionEvent
}