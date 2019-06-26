import { Meteor } from 'meteor/meteor';
import { PubSub } from 'graphql-subscriptions';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
import { basicIteratorWrapper } from './helper';

const redis = Meteor.settings.private && Meteor.settings.private.redis;
const { host, port, password } = redis || {};

let pubSub;
let iteratorWrapper = basicIteratorWrapper;

const initPubSub = ({ withRedis = false }) => {
    if (withRedis && redis) {
        const options = {
            host: host,
            port: port,
            password: password,
            connectTimeout: 10000
        };

        const publisher = new Redis(options);
        const subscriber = new Redis(options);

        pubSub = new RedisPubSub({
            publisher,
            subscriber
        });

    } else {
        pubSub = new PubSub();
        pubSub.ee.setMaxListeners(100);
    }
};

export default pubSub;

export {
    pubSub,
    initPubSub,
    iteratorWrapper
}