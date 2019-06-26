import { Mongo } from 'meteor/mongo';
import ChatMessageSchema from './schema';

const ChatMessages = new Mongo.Collection('chatMessages');

ChatMessages.attachSchema(ChatMessageSchema);

export default ChatMessages;
