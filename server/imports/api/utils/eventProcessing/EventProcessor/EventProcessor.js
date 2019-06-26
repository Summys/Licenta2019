// @flow

import EventStore from '../EventStore';

export default class EventProcessor {
    eventProcessFunctionRelation = {};

    constructor(args: {
        eventProcessFunctionRelation: Object
    }) {
        this.eventProcessFunctionRelation = args.eventProcessFunctionRelation
    }

    getEventProcessFunctionRelation(eventType: string) {
        return this.eventProcessFunctionRelation[eventType];
    }

    process(event) {
        const { type } = event;
        const processFunction = this.getEventProcessFunctionRelation.call(this, type);

        if (processFunction) {
            processFunction.call(this, event);
        } else {
            console.error(`Event process function not found for event type ${type}`);
        }
    }

    flush(eventStore: EventStore) {
        const events = eventStore.getEvents();

        events.forEach(event => {
            this.process(event)
        });

        eventStore.clearEvents();
    }
}

