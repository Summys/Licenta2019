import { Meteor } from 'meteor/meteor';
import { ChatService } from '../../services';
import { ChatEventProcessor } from '/imports/api/graphql/modules/chat/services/EventProcessor';
import withMeteorBind from '/imports/api/utils/withMeteorBind';
import {
    ChatRootEvent
} from '/imports/api/graphql/modules/chat/eventSourcing/ChatEvent.js';

const onConnect = (_, args, { userId }) => {
    // DEFER or events won't be received by respective client
    Meteor.defer(() => {
        withMeteorBind(() => {
            const chatRoot = ChatService.getChatRootByUserId(userId);
            const chatRootEvent = new ChatRootEvent(chatRoot, [userId]);

            ChatEventProcessor.process(chatRootEvent);
        });
    });
};

const onDisconnect = (_, args, { userId }) => {

};

const chatSubscriptionHooks = {
    onConnect,
    onDisconnect
};

export default chatSubscriptionHooks

export {
    onConnect,
    onDisconnect
}