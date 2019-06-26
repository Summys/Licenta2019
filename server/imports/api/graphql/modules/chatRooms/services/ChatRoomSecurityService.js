import { Meteor } from 'meteor/meteor';

// db imports
import { ChatRooms } from '/imports/db';

export default class ChatRoomSecurityService {
    static checkIfInChatRoom({ userId, chatRoomId } = {}) {
        const chatRoom = ChatRooms.findOne({
            _id: chatRoomId,
            participantUserIdList: userId
        });

        if (!chatRoom) {
            throw new Meteor.Error('No chat room access');
        } else {
            return true;
        }
    }
}