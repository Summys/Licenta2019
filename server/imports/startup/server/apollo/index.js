import { initialize } from 'meteor/cultofcoders:apollo';
import './accounts.js';
import '/imports/api/graphql';
import configuration from './configuration.js';

initialize(configuration);