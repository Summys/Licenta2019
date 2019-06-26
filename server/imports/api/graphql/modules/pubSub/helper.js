import { withFilter } from 'graphql-subscriptions';
import { pubSub } from './index';
import withMeteorBind from '/imports/api/utils/withMeteorBind';

const withDisconnect = <T>(asyncIterator: AsyncIterator<T | undefined>, onDisconnect: Function): AsyncIterator<T | undefined> => {
    const wrap = function (asyncReturnFunction) {
        return function () {
            const args = [...arguments].splice(0);
            onDisconnect();
            return asyncReturnFunction ? asyncReturnFunction.apply(asyncIterator, args)  : Promise.resolve({ value: undefined, done: true })
        };
    };

    asyncIterator.return = wrap(asyncIterator.return);

    return asyncIterator;
};

const basicIteratorWrapper = ({ onConnect, onDisconnect, filterFn = true, triggerFn }) => {
    if (!triggerFn) {
        return console.error('No trigger function provided');
    }

    onConnect = onConnect || function () {};
    onDisconnect = onDisconnect || function () {};

    return withFilter(
        (...args) => {
            withMeteorBind(() => {
                onConnect(...args);
            });

            return withDisconnect(
                pubSub.asyncIterator(triggerFn(...args)),
                () => {
                    withMeteorBind(() => {
                        onDisconnect(...args);
                    });
                });
        },
        // filterFn, 
        (payload, variables, context, info) => {
            return filterFn(payload, variables, context, info);
        }
    )
};

export {
    basicIteratorWrapper
}