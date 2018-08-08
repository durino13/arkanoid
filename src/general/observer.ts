import { Collision } from '../model/collision';

export interface IObserver {
    onCollision(collision: Collision);
}