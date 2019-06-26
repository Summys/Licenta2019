// @flow
import { ChatRooms } from "/imports/db";
import { ChatRoomQuery } from "./queries";
import { formatChatRoom, formatChatRoomList } from "./formating";
import { ChatRoomUpdatedEvent } from "/imports/api/graphql/modules/chat/eventSourcing/ChatEvent";
import { ChatEventProcessor } from "/imports/api/graphql/modules/chat/services/EventProcessor";

export default class ChatRoomService {
  static get({ chatRoomId, userId }) {
    const filters = { _id: chatRoomId };

    const chatRoom = ChatRoomQuery.clone({ filters }).fetchOne();

    return formatChatRoom(chatRoom, userId);
  }

  static getChatRoomListByUserId(userId) {
    const filters = {
      participantUserIdList: userId
    };

    const chatRoomList = ChatRoomQuery.clone({
      currentUserId: userId,
      filters
    }).fetch();

    return formatChatRoomList(chatRoomList, userId);
  }

  static getChatRoomParticipantUserIdList(chatRoomId) {
    const chatRoom = ChatRooms.findOne(chatRoomId) || {};

    const { participantUserIdList = [] } = chatRoom;

    return participantUserIdList;
  }

  static createOneToOneRoom({ userId, targetUserId }) {
    const existingChatRoom = ChatRoomService.getExistingOneToOneRoom(
      userId,
      targetUserId
    );

    if (existingChatRoom) {
      return existingChatRoom;
    }

    const chatRoomId = ChatRooms.insert({
      participantUserIdList: [userId, targetUserId]
    });

    return this.get({ chatRoomId, userId });
  }

  static getExistingOneToOneRoom(firstUserId, secondUserId) {
    return ChatRoomQuery.clone({
      filters: {
        $or: [
          { participantUserIdList: { $eq: [firstUserId, secondUserId] } },
          { participantUserIdList: { $eq: [secondUserId, firstUserId] } }
        ]
      }
    }).fetchOne();
  }

  static setNewViewDate({ userId, chatRoomId }) {
    ChatRooms.update(
      { _id: chatRoomId, "viewDateList.userId": userId },
      {
        $set: {
          "viewDateList.$": {
            userId,
            date: new Date()
          }
        }
      }
    );

    const chatRoom = ChatRoomService.get({ userId, chatRoomId });
    const chatRoomUpdatedEvent = new ChatRoomUpdatedEvent(chatRoom, [userId]);

    ChatEventProcessor.process(chatRoomUpdatedEvent);

    return chatRoom;
  }

  static setNewViewStartDate({ userId, chatRoomId }) {
    ChatRooms.update(
      { _id: chatRoomId, "viewStartDateList.userId": userId },
      {
        $set: {
          "viewStartDateList.$": {
            userId,
            date: new Date()
          }
        }
      }
    );

    const chatRoom = ChatRoomService.get({ userId, chatRoomId });
    const chatRoomUpdatedEvent = new ChatRoomUpdatedEvent(chatRoom, [userId]);

    ChatEventProcessor.process(chatRoomUpdatedEvent);

    return chatRoom;
  }

  static removeChatRoomById(chatRoomId) {
    return ChatRooms.remove({ _id: chatRoomId });
  }
}
