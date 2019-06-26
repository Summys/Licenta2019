import { ChatMessages } from '/imports/db';
import { AllChatMessageFields } from './fields';

export default ChatMessages.createQuery({
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
    ...AllChatMessageFields
});