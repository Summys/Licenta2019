import * as Entities from './entities';
import * as Modules from './modules';
import {load} from 'graphql-load';
import './modules/chatMessages/graphql';
import './modules/chatRooms/graphql';
import './modules/chat/graphql';

export default load([Entities, Modules]);