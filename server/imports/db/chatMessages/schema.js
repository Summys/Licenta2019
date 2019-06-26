import SimpleSchema from 'simpl-schema';

export default new SimpleSchema({
    userId: {
        type: String,
        optional: true
    },

    chatRoomId: {
        type: String
    },

    text: {
        type: String,
        optional: true
    },

    createdAt: {
        type: Date,
        optional: true
    }
});