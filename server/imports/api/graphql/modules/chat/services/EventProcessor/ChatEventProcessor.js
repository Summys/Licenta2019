// domain imports
import { eventTypes } from '/imports/api/graphql/modules/chat/eventSourcing/event.enums.js';

import {
    processChatRoot,
    processChatNewRoom,
    processChatNewMessage,
    processChatRoomUpdated,
    processChatRoomRemoved
} from './eventProcessingFunctions';

import { EventProcessor } from '/imports/api/utils/eventProcessing';

const {
    CHAT_ROOT,
    CHAT_NEW_ROOM,
    CHAT_NEW_MESSAGE,
    CHAT_ROOM_UPDATED,
    CHAT_ROOM_REMOVED
} = eventTypes;

const ChatEventProcessor = new EventProcessor({
    eventProcessFunctionRelation: {
        [CHAT_ROOT]: processChatRoot,
        [CHAT_NEW_ROOM]: processChatNewRoom,
        [CHAT_NEW_MESSAGE]: processChatNewMessage,
        [CHAT_ROOM_UPDATED]: processChatRoomUpdated,
        [CHAT_ROOM_REMOVED]: processChatRoomRemoved,
    }
});

export default ChatEventProcessor;