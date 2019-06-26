import Security from "/imports/api/utils/security";
import {
  ChatRoomService,
  ChatRoomSecurityService
} from "/imports/api/graphql/modules/chatRooms/services";

export default {
  Query: {
    getChatRoom(_, { chatRoomId }, { userId }) {
      Security.checkIfLoggedIn(userId);
      ChatRoomSecurityService.checkIfInChatRoom({ userId, chatRoomId });

      return ChatRoomService.get({ userId, chatRoomId });
    }
  },
  Mutation: {
    createOneToOneChatRoom(_, { targetUserId }, { userId }) {
      console.log("targetUserId", targetUserId);
      console.log("userId", userId);
      Security.checkIfLoggedIn(userId);

      return ChatRoomService.createOneToOneRoom({
        userId,
        targetUserId
      });
    },
    setNewChatRoomViewDate(_, { chatRoomId }, { userId }) {
      Security.checkIfLoggedIn(userId);
      ChatRoomSecurityService.checkIfInChatRoom({ userId, chatRoomId });

      return ChatRoomService.setNewViewDate({ userId, chatRoomId });
    },
    setNewChatRoomViewStartDate(_, { chatRoomId }, { userId }) {
      Security.checkIfLoggedIn(userId);
      ChatRoomSecurityService.checkIfInChatRoom({ userId, chatRoomId });

      return ChatRoomService.setNewViewStartDate({ userId, chatRoomId });
    }
  }
};
