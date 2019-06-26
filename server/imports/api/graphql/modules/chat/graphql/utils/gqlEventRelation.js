import { eventTypes } from '/imports/api/graphql/modules/chat/eventSourcing/event.enums.js';
import { gqlEventTypes } from '../enums';

const {
    CHAT_ROOT,
    CHAT_NEW_ROOM,
    CHAT_NEW_MESSAGE,
    CHAT_ROOM_UPDATED,
    CHAT_ROOM_REMOVED
} = eventTypes;

const {
    ChatRootEvent,
    ChatNewRoomEvent,
    ChatNewMessageEvent,
    ChatRoomUpdatedEvent,
    ChatRoomRemovedEvent,
} = gqlEventTypes;

const gqlEventRelation = {
    [CHAT_ROOT]: ChatRootEvent,
    [CHAT_NEW_ROOM]: ChatNewRoomEvent,
    [CHAT_NEW_MESSAGE]: ChatNewMessageEvent,
    [CHAT_ROOM_UPDATED]: ChatRoomUpdatedEvent,
    [CHAT_ROOM_REMOVED]: ChatRoomRemovedEvent
};

export default gqlEventRelation;