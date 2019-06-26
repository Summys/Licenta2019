import {Mongo} from "meteor/mongo";
import StorySchema from './schema.js';

const Stories = new Mongo.Collection('stories');

Stories.attachSchema(StorySchema);

export default Stories;