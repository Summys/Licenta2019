import {
    getChatRoomPartner,
    filterMessages,
    getLastMessage,
    getMissedMessageCount
} from './helper';

const formatChatRoom = (chatRoom, currentUserId) => {
    if (!chatRoom) {
        return null
    }

    if (!currentUserId) {
        return chatRoom
    }

    filterMessages(chatRoom, currentUserId);

    const partner = getChatRoomPartner(chatRoom, currentUserId);
    const lastMessage = getLastMessage(chatRoom, currentUserId);
    const missedMessageCount = getMissedMessageCount(chatRoom, currentUserId);

    const metaData = {
        lastMessage,
        missedMessageCount,
        partner
    };

    return {
        ...chatRoom,
        metaData
    }
};

const formatChatRoomList = (chatRoomList = [], currentUserId) => {
    for (let index = chatRoomList.length - 1; index >= 0; --index) {
        chatRoomList[index] = formatChatRoom(chatRoomList[index], currentUserId);

        if (!chatRoomList[index]) {
            chatRoomList.splice(index, 1);
        }
    }

    return chatRoomList;
};

export { formatChatRoom, formatChatRoomList }