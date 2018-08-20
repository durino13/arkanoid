import { IObserver } from './observer';

export class EventEmitter {

    protected _observers: Array<IObserver> = [];

    emit(event: Event, data: any) {
        this._observers.forEach((observer: IObserver) => {
            observer.onEvent(event, data);
        });
    }

    registerObserver(observer: IObserver) {
        this._observers.push(observer);
    }

}

export class Event {

    public static readonly EVENT_ON_COLLISION = 'EVENT_ON_COLLISION';

    public static readonly EVENT_SPACEBAR_PRESS = 'EVENT_SPACEBAR_PRESS';

    protected _name: string;

    constructor(name: string) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

}