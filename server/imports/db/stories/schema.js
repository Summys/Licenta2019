import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
    name: {
        type: String
    },

    description: {
        type: String
    },

    isActive: {
        type: Boolean
    },

    createdAt: {
        type: Date,
        optional: true
    }
});