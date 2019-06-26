// @flow
import type { IEvent } from '../Event';
import EventProcessor from '../EventProcessor';

export default class EventStore {
    events: Array<IEvent>;
    eventProcessor: EventProcessor;

    constructor(args: { eventProcessor: EventProcessor }) {
        this.events = [];
        this.eventProcessor = args.eventProcessor;
    }

    commit(event: IEvent) {
        this.events = [...this.events, event];
    }

    getEvents() {
        return this.events;
    }

    clearEvents() {
        this.events = [];
    }

    flush() {
        this.eventProcessor.flush(this)
    }
}