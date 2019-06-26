import SimpleSchema from "simpl-schema";
import { roleList } from "./enums/accountRole.enum.js";
import ProfileSchema from "./schemas/profile.schema.js";

export default new SimpleSchema({
  emails: {
    type: Array,
    optional: true
  },

  username: String,

  "emails.$": {
    type: Object
  },

  "emails.$.address": {
    type: String
  },

  "emails.$.verified": {
    type: Boolean,
    optional: true
  },

  roles: {
    type: Array,
    defaultValue: [],
    optional: true
  },

  "roles.$": {
    type: String,
    allowedValues: roleList
  },
  services: { type: Object, blackbox: true },

  profile: {
    type: ProfileSchema,
    optional: true
  },

  createdAt: {
    type: Date,
    optional: true
  }
});
