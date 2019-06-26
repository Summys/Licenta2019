import { Users, ChatMessages, ChatRooms } from '/imports/db';

ChatRooms.addLinks({
    participants: {
        collection: Users,
        type: 'many',
        field: 'participantUserIdList'
    },

    messages: {
        collection: ChatMessages,
        inversedBy: 'chatRoom'
    }
});