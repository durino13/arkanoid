import { Event } from '../lib/eventEmitter';

export interface IObserver {
    onEvent(name: Event, data: any);
}