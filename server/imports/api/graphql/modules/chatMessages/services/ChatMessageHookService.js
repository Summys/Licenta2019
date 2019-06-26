import { Meteor } from 'meteor/meteor';
import { ChatEventProcessor } from '/imports/api/graphql/modules/chat/services/EventProcessor';
import withMeteorBind from '/imports/api/utils/withMeteorBind';
import { ChatRoomService } from '/imports/api/graphql/modules/chatRooms/services';
import { ChatNewMessageEvent, ChatRoomUpdatedEvent } from '/imports/api/graphql/modules/chat/eventSourcing/ChatEvent';
import ChatMessageService from './ChatMessageService';

export default class ChatRoomHookService {
    static beforeInsert(userId, doc) {
        Object.assign(doc, {
            createdAt: new Date()
        });

        return doc;
    }

    static afterInsert(userId, doc) {
        const { _id: chatMessageId, chatRoomId } = doc;

        Meteor.defer(() => {
            withMeteorBind(() => {
                const chatRoomParticipantUserIdList = ChatRoomService.getChatRoomParticipantUserIdList(chatRoomId);
                const chatMessage = ChatMessageService.get(chatMessageId);
                const chatNewMessageEvent = new ChatNewMessageEvent(chatMessage, chatRoomParticipantUserIdList);

                ChatEventProcessor.process(chatNewMessageEvent);

                chatRoomParticipantUserIdList.forEach(participantUserId => {
                    const chatRoom = ChatRoomService.get({ userId: participantUserId, chatRoomId });
                    const chatRoomUpdatedEvent = new ChatRoomUpdatedEvent(chatRoom, [participantUserId]);

                    ChatEventProcessor.process(chatRoomUpdatedEvent);
                })
            });
        });
    }
}