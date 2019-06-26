// @flow
import type { IChatEvent } from './ChatEvent';
import { eventTypes } from './event.enums';

const {
    CHAT_ROOT,
    CHAT_NEW_ROOM,
    CHAT_NEW_MESSAGE,
    CHAT_ROOM_UPDATED,
    CHAT_ROOM_REMOVED
} = eventTypes;

class ChatRootEvent implements IChatEvent {
    type = CHAT_ROOT;
    payload: any;
    receiverUserIdList: Array<string>;

    constructor(payload: any, receiverUserIdList: Array<string> = []) {
        this.payload = payload;
        this.receiverUserIdList = receiverUserIdList;
    }
}

class ChatNewRoomEvent implements IChatEvent {
    type = CHAT_NEW_ROOM;
    payload: any;
    receiverUserIdList: Array<string>;

    constructor(payload: any, receiverUserIdList: Array<string> = []) {
        this.payload = payload;
        this.receiverUserIdList = receiverUserIdList;
    }
}

class ChatNewMessageEvent implements IChatEvent {
    type = CHAT_NEW_MESSAGE;
    payload: any;

    constructor(payload: any, receiverUserIdList: Array<string> = []) {
        this.payload = payload;
        this.receiverUserIdList = receiverUserIdList;
    }
}

class ChatRoomUpdatedEvent implements IChatEvent {
    type = CHAT_ROOM_UPDATED;
    payload: any;

    constructor(payload: any, receiverUserIdList: Array<string> = []) {
        this.payload = payload;
        this.receiverUserIdList = receiverUserIdList;
    }
}

class ChatRoomRemovedEvent implements IChatEvent {
    type = CHAT_ROOM_REMOVED;
    payload: any;

    constructor(payload: any, receiverUserIdList: Array<string> = []) {
        this.payload = payload;
        this.receiverUserIdList = receiverUserIdList;
    }
}

export {
    ChatRootEvent,
    ChatNewRoomEvent,
    ChatNewMessageEvent,
    ChatRoomUpdatedEvent,
    ChatRoomRemovedEvent
}