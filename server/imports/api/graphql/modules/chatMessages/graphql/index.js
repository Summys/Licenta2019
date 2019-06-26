import { load } from 'graphql-load';

import resolvers from './chatMessages.resolvers';
import typeDefs from './chatMessages.gql';

load({
    typeDefs,
    resolvers,
});