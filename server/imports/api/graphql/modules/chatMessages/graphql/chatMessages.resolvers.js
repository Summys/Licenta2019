import Security from '/imports/api/utils/security';
import { ChatMessageService } from '/imports/api/graphql/modules/chatMessages/services';
import { ChatRoomSecurityService } from '/imports/api/graphql/modules/chatRooms/services';

export default {
    Query: {
        getChatRoomMessageList(_, { chatRoomId }, { userId }) {
            ChatRoomSecurityService.checkIfInChatRoom({ userId, chatRoomId });

            return ChatMessageService.getChatRoomMessageList(chatRoomId);
        }
    },
    Mutation: {
        createMessage(_, { input = {} }, { userId }) {
            const { chatRoomId } = input;

            Security.checkIfLoggedIn(userId);
            ChatRoomSecurityService.checkIfInChatRoom({ userId, chatRoomId });

            return ChatMessageService.create({ ...input, userId });
        }
    }
}