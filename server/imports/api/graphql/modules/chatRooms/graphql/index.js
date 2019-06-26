import { load } from 'graphql-load';

import resolvers from './chatRooms.resolvers';
import typeDefs from './chatRooms.gql';

load({
    typeDefs,
    resolvers,
});