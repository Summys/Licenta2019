import { ChatMessages } from '/imports/db';
import { ChatMessageQuery } from './queries';
import { ChatRoomService } from '/imports/api/graphql/modules/chatRooms/services';

export default class ChatMessageService {
    static get(chatMessageId: string) {
        const filters = {
            _id: chatMessageId
        };

        return ChatMessageQuery.clone({ filters }).fetchOne();
    }

    static getChatRoomMessageList(chatRoomId: string) {
        const filters = {
            chatRoomId
        };

        return ChatMessageQuery.clone({ filters }).fetch();
    }

    static create(args: {
        chatRoomId: string,
        userId: string,
        text: string,
    }) {
        const {
            chatRoomId,
            userId,
            text
        } = args;

        const chatMessageId = ChatMessages.insert({
            chatRoomId,
            userId,
            text
        });

        ChatRoomService.setNewViewDate({ userId, chatRoomId });

        return this.get(chatMessageId);
    }
}