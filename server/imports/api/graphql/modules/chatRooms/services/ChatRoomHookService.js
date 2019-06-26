import { Meteor } from 'meteor/meteor';
import { ChatMessages } from '/imports/db';
import ChatRoomService from './ChatRoomService';
import { ChatEventProcessor } from '/imports/api/graphql/modules/chat/services/EventProcessor';
import withMeteorBind from '/imports/api/utils/withMeteorBind';
import { ChatNewRoomEvent, ChatRoomRemovedEvent } from '/imports/api/graphql/modules/chat/eventSourcing/ChatEvent';

export default class ChatRoomHookService {
    static beforeInsert(userId, doc) {
        const serverInsertDate = new Date();
        const { participantUserIdList = [] } = doc;
        const viewDateList = participantUserIdList.map(userId => {
            return {
                userId,
                date: serverInsertDate
            }
        });

        const viewStartDateList = participantUserIdList.map(userId => {
            return {
                userId,
                date: serverInsertDate
            }
        });

        Object.assign(doc, {
            viewDateList,
            viewStartDateList,
            createdAt: serverInsertDate
        });

        return doc;
    }

    static afterInsert(userId, doc) {
        const { _id: chatRoomId, participantUserIdList = [] } = doc;

        Meteor.defer(() => {
            withMeteorBind(() => {
                participantUserIdList.forEach(participantUserId => {
                    const chatRoom = ChatRoomService.get({ userId: participantUserId, chatRoomId });
                    const chatNewRoomEvent = new ChatNewRoomEvent(chatRoom, [participantUserId]);

                    ChatEventProcessor.process(chatNewRoomEvent);
                })
            });
        });
    }

    static beforeRemove(userId, doc) {
        const { _id: chatRoomId } = doc;

        ChatMessages.direct.remove({ chatRoomId });
    }

    static afterRemove(userId, doc) {
        const { _id: chatRoomId, participantUserIdList = [] } = doc;

        const chatRoomRemovedEvent = new ChatRoomRemovedEvent(chatRoomId, participantUserIdList);

        ChatEventProcessor.process(chatRoomRemovedEvent);
    }
}