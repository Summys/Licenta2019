import { Users, ChatRooms, ChatMessages } from '/imports/db';

ChatMessages.addLinks({
    user: {
        collection: Users,
        type: 'one',
        field: 'userId'
    },

    chatRoom: {
        collection: ChatRooms,
        type: 'one',
        field: 'chatRoomId'
    }
});