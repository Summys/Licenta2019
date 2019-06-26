import _ from 'underscore';

const eventTypes = {
    CHAT_ROOT: 'ChatRoot',
    CHAT_NEW_ROOM: 'ChatNewRoom',
    CHAT_NEW_MESSAGE: 'ChatNewMessage',
    CHAT_ROOM_UPDATED: 'ChatRoomUpdated',
    CHAT_ROOM_REMOVED: 'ChatRoomRemoved'
};

const eventTypeList = _.values(eventTypes);

export { eventTypes, eventTypeList };