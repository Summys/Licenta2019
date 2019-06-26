import { ChatRooms } from '/imports/db';
import { AllChatRoomFields } from './fields';

export default ChatRooms.createQuery({
    $filter({ filters, params, options }) {
        const { limit, skip } = params;

        if (limit > 0) {
            Object.assign(options, { limit });
        }
        if (skip > 0) {
            Object.assign(options, { skip });
        }

        if (params.filters) {
            Object.assign(filters, params.filters);
        }

        Object.assign(options, { sort: { createdAt: -1 } });
    },
    ...AllChatRoomFields
});