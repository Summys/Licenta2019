import { ChatRooms } from '/imports/db';
import { ChatRoomHookService } from '/imports/api/graphql/modules/chatRooms/services';

ChatRooms.before.insert(function (userId, doc) {
    return ChatRoomHookService.beforeInsert(userId, doc);
});

ChatRooms.after.insert(function (userId, doc) {
    return ChatRoomHookService.afterInsert(userId, doc);
});

ChatRooms.before.remove(function (userId, doc) {
    return ChatRoomHookService.beforeRemove(userId, doc);
});

ChatRooms.after.remove(function (userId, doc) {
    return ChatRoomHookService.afterRemove(userId, doc);
});