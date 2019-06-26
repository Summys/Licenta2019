import {Users} from '/imports/db';

export default {
    Query: {
        users() {
            return Users.find().fetch();
        }
    }
};