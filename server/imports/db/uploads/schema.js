import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
    id: {
        type: String
    },
    filename: {
        type: String
    },

    path: {
        type: String
    },

    mimetype: {
        type: String
    },

    createdAt: {
        type: Date,
        optional: true
    }
});