import {Mongo} from "meteor/mongo";
import UploadsSchema from './schema.js';

const Uploads = new Mongo.Collection('uploads');

Uploads.attachSchema(UploadsSchema);

export default Uploads;