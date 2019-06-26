import { Meteor } from 'meteor/meteor';

export default {
    checkIfLoggedIn(userId) {
        if (!userId) {
            throw new Meteor.Error('Not logged-in!');
        }
    },
}