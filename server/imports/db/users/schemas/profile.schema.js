import SimpleSchema from "simpl-schema";

export default new SimpleSchema({
    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    phone: {
        type: String,
        optional: true
    }
});