// @flow
import { eventTypes } from './event.enums';

import {
    ChatRootEvent,
    ChatNewRoomEvent,
    ChatNewMessageEvent,
    ChatRoomUpdatedEvent,
    ChatRoomRemovedEvent
} from './ChatEvents';

export interface IChatEvent {
    type: $Values<typeof eventTypes>;
    payload: any;
    receiverUserIdList: Array<string>;
}

export type ChatEvent = (
    ChatRootEvent
    | ChatNewRoomEvent
    | ChatNewMessageEvent
    | ChatRoomUpdatedEvent
    | ChatRoomRemovedEvent
    )

export {
    ChatRootEvent,
    ChatNewRoomEvent,
    ChatNewMessageEvent,
    ChatRoomUpdatedEvent,
    ChatRoomRemovedEvent
}