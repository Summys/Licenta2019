const getViewDates = (chatRoom, currentUserId) => {
    const { viewDateList = [], viewStartDateList = [] } = chatRoom;

    const lastViewDate = viewDateList.find(viewDate => {
        const { userId: viewDateUserId } = viewDate;

        return viewDateUserId === currentUserId
    }) || {};

    const viewStartDate = viewStartDateList.find(viewStartDate => {
        const { userId: viewStartDateUserId } = viewStartDate;

        return viewStartDateUserId === currentUserId
    }) || {};

    return {
        lastViewDate: lastViewDate.date,
        viewStartDate: viewStartDate.date
    }
};

const getChatRoomPartner = (chatRoom, currentUserId) => {
    const { participants = [] } = chatRoom;

    return participants.find(participant => {
        const { _id: participantId } = participant;

        return participantId !== currentUserId;
    });
};

const filterMessages = (chatRoom, currentUserId) => {
    const { viewStartDate } = getViewDates(chatRoom, currentUserId);

    chatRoom.messages = (chatRoom.messages || []).filter(message => {
        const { createdAt } = message;

        return createdAt > viewStartDate;
    });
};

const getLastMessage = (chatRoom, currentUserId) => {
    return chatRoom.messages[chatRoom.messages.length - 1];
};

const getMissedMessageCount = (chatRoom, currentUserId) => {
    const { lastViewDate } = getViewDates(chatRoom, currentUserId);
    let missedMessageCount = 0;

    chatRoom.messages.forEach(message => {
        if (message.createdAt > lastViewDate) {
            missedMessageCount++;
        }
    });

    return missedMessageCount;
};

export {
    getChatRoomPartner,
    filterMessages,
    getLastMessage,
    getMissedMessageCount
}