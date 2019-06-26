import { Config } from 'meteor/cultofcoders:apollo';

Object.assign(Config, {
    introspection: true,
    DISABLE_SUBSCRIPTIONS: false,
    DISABLE_GRAPHIQL: false,
    USER_DEFAULT_FIELDS: {
        _id: 1,
        username: 1,
        emails: 1,
        roles: 1,
        token: 1
    },
});

export default Config;