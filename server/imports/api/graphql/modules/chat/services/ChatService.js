import { ChatRoomService } from '/imports/api/graphql/modules/chatRooms/services';

export default class ChatService {
    static action() {
        return true;
    }

    static getChatRootByUserId(userId) {
        return ChatRoomService.getChatRoomListByUserId(userId);
    }
}