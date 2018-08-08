import { IObserver } from "./observer";
import { Collision } from '../model/collision';

export interface IObservable {
    registerObserver(observer: IObserver);
    notifyObservers(collision: Collision);
}