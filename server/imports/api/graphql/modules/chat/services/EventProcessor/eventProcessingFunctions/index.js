import { publishChatSubscriptionEvent } from '../helper';

const processChatRoot = (event) => {
    const { type, receiverUserIdList, payload } = event;

    publishChatSubscriptionEvent(receiverUserIdList, { type, payload });
};

const processChatNewRoom = (event) => {
    const { type, receiverUserIdList, payload } = event;

    publishChatSubscriptionEvent(receiverUserIdList, { type, payload });
};

const processChatNewMessage = (event) => {
    console.log('event', event)
    const { type, receiverUserIdList, payload } = event;

    publishChatSubscriptionEvent(receiverUserIdList, { type, payload });
};

const processChatRoomUpdated = (event) => {
    const { type, receiverUserIdList, payload } = event;

    publishChatSubscriptionEvent(receiverUserIdList, { type, payload });
};

const processChatRoomRemoved = (event) => {
    const { type, receiverUserIdList, payload } = event;

    publishChatSubscriptionEvent(receiverUserIdList, { type, payload });
};

export {
    processChatRoot,
    processChatNewRoom,
    processChatNewMessage,
    processChatRoomUpdated,
    processChatRoomRemoved
}