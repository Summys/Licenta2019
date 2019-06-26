import { load } from 'graphql-load';

import resolvers from './chat.resolvers';
import ChatTypeDefs from './chat.gql';
import ChatEventTypeDefs from './chatEvent.types.gql';

const typeDefs = [
    ChatEventTypeDefs,
    ChatTypeDefs
];

load({
    typeDefs,
    resolvers,
});