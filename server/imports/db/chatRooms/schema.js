import SimpleSchema from 'simpl-schema';
import {
    ViewedAtDateSchema,
    ViewStartDateSchema
} from './schemaComponents';

export default new SimpleSchema({
    participantUserIdList: {
        type: Array
    },

    "participantUserIdList.$": {
        type: String
    },

    viewDateList: {
        type: Array,
        optional: true
    },

    "viewDateList.$": {
        type: ViewedAtDateSchema
    },

    viewStartDateList: {
        type: Array,
        optional: true
    },

    "viewStartDateList.$": {
        type: ViewStartDateSchema
    },

    createdAt: {
        type: Date,
        optional: true
    }
});
