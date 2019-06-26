import { ChatMessages } from '/imports/db';
import { ChatMessageHookService } from '/imports/api/graphql/modules/chatMessages/services';

ChatMessages.before.insert(function (userId, doc) {
    return ChatMessageHookService.beforeInsert(userId, doc);
});

ChatMessages.after.insert(function (userId, doc) {
    return ChatMessageHookService.afterInsert(userId, doc);
});