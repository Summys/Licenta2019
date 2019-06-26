import { Mongo } from 'meteor/mongo';
import ChatRoomSchema from './schema';

const ChatRooms = new Mongo.Collection('chatRooms');

ChatRooms.attachSchema(ChatRoomSchema);

export default ChatRooms;
