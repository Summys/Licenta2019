import {Meteor} from 'meteor/meteor';
import UserSchema from './schema.js';

const Users = Meteor.users;
Users.attachSchema(UserSchema);

export default Users;