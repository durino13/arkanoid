import { IGameObject } from './game_object';
import { IObservable } from '../general/observable';
import { IObserver } from '../general/observer';
import { Collision } from './collision';

export class CollisionManager implements IObservable {

    protected observers: Array<IObserver> = [];

    protected _lastCollisionSide;

    /**
     * Detect collision between 2 objects
     * @param object1
     * @param object2
     * @returns {boolean}
     */
    public determineCollision(object1: IGameObject, object2: IGameObject) {

        // CollisionManager occures when all 4 conditions are met
        let c1 = object1.getTopLeftCornerPosition().x < object2.getTopLeftCornerPosition().x + object2.width();
        let c2 = object2.getTopLeftCornerPosition().x < object1.getTopLeftCornerPosition().x + object1.width();
        let c3 = object1.getTopLeftCornerPosition().y < object2.getTopLeftCornerPosition().y + object2.height();
        let c4 = object2.getTopLeftCornerPosition().y < object1.getTopLeftCornerPosition().y + object1.height();

        if ( c1 && c2 && c3 && c4) {

            console.log('------------------------------------');

            let position;

            let dx, dy;

            // G1
            if ((object1.getTopLeftCornerPosition().x < object2.getTopLeftCornerPosition().x) && (object1.getTopLeftCornerPosition().y < object2.getTopLeftCornerPosition().y)) {
                console.log('G1');
                dx = (object1.getTopLeftCornerPosition().x + object1.width() - object2.getTopLeftCornerPosition().x);
                dy = (object1.getTopLeftCornerPosition().y + object1.height() - object2.getTopLeftCornerPosition().y);

                if (dx > dy) {
                    position = Collision.SIDE_TOP;
                } else {
                    position = Collision.SIDE_LEFT;
                }
            }

            // G2
            if ((object1.getTopLeftCornerPosition().x > object2.getTopLeftCornerPosition().x) && ((object1.getTopLeftCornerPosition().x + object1.width()) < (object2.getTopLeftCornerPosition().x + object2.width())) && (object1.getTopLeftCornerPosition().y < object2.getTopLeftCornerPosition().y)) {
                console.log('G2');
                position = Collision.SIDE_TOP;
            }

            // G3
            if ((object1.getTopLeftCornerPosition().x < object2.getTopLeftCornerPosition().x + object2.width()) && (object1.getTopLeftCornerPosition().x + object1.width()) > (object2.getTopLeftCornerPosition().x + object2.width()) && (object1.getTopLeftCornerPosition().y < object2.getTopLeftCornerPosition().y)) {
                console.log('G3');
                dx = ((object2.getTopLeftCornerPosition().x + object2.width()) - object1.getTopLeftCornerPosition().x);
                dy = ((object1.getTopLeftCornerPosition().y + object1.height()) - object2.getTopLeftCornerPosition().y);

                if (dx > dy) {
                    position = Collision.SIDE_TOP;
                } else {
                    position = Collision.SIDE_RIGHT;
                }
            }

            // G4
            if ((object1.getTopLeftCornerPosition().y > object2.getTopLeftCornerPosition().y) && ((object1.getTopLeftCornerPosition().y + object1.height()) < (object2.getTopLeftCornerPosition().y + object2.height())) && (object1.getTopLeftCornerPosition().x > object2.getTopLeftCornerPosition().x)) {
                console.log('G4');
                position = Collision.SIDE_RIGHT;
            }

            // G5
            if ((object1.getTopLeftCornerPosition().x < object2.getTopLeftCornerPosition().x + object2.width()) && (object1.getTopLeftCornerPosition().y < object2.getTopLeftCornerPosition().y + object2.height()) && (object1.getTopLeftCornerPosition().y + object1.height() > object2.getTopLeftCornerPosition().y + object2.height()) && (object1.getTopLeftCornerPosition().x + object1.width() > object2.getTopLeftCornerPosition().x + object2.width())) {
                console.log('G5');
                dx = (object2.getTopLeftCornerPosition().x + object2.width()) - object1.getTopLeftCornerPosition().x;
                dy = (object2.getTopLeftCornerPosition().y + object2.height()) - object1.getTopLeftCornerPosition().x;

                if (dx > dy) {
                    position = Collision.SIDE_BOTTOM;
                } else {
                    position = Collision.SIDE_RIGHT;
                }
            }

            // G6
            if ((object1.getTopLeftCornerPosition().x > object2.getTopLeftCornerPosition().x) && ((object1.getTopLeftCornerPosition().x + object1.width()) < (object2.getTopLeftCornerPosition().x + object2.width())) && (object1.getTopLeftCornerPosition().y > object2.getTopLeftCornerPosition().y)) {
                console.log('G6');
                position = Collision.SIDE_BOTTOM;
            }

            // G7
            if ((object1.getTopLeftCornerPosition().x < object2.getTopLeftCornerPosition().x) && (object1.getTopLeftCornerPosition().y < object2.getTopLeftCornerPosition().y + object2.height()) && (object1.getTopLeftCornerPosition().y + object1.height() > object2.getTopLeftCornerPosition().y + object2.height())) {
                console.log('G7');
                dx = (object1.getTopLeftCornerPosition().x + object1.width()) - object2.getTopLeftCornerPosition().x;
                dy = (object1.getTopLeftCornerPosition().y + object1.height()) - object2.getTopLeftCornerPosition().y;

                if (dx > dy) {
                    position = Collision.SIDE_LEFT;
                } else {
                    position = Collision.SIDE_BOTTOM;
                }

            }

            // G8
            if (((object1.getTopLeftCornerPosition().x < object2.getTopLeftCornerPosition().x) && ((object1.getTopLeftCornerPosition().x + object1.width()) > object2.getTopLeftCornerPosition().x)) && (object1.getTopLeftCornerPosition().y > object2.getTopLeftCornerPosition().y) && ((object1.getTopLeftCornerPosition().y + object1.height() < object2.getTopLeftCornerPosition().y + object2.height()))) {
                console.log('G8');
                position = Collision.SIDE_LEFT;
            }

            // Niekedy sa stava, ze kolizia nastava 2x na tej istej hrane, co sa nesmie stat ..
            if (this._lastCollisionSide !== position) {
                return new Collision(object1, object2, position);
            } else {
                console.log('Skipping collision ...')
            }

        }

        // No collision
        return false;
    }

    set lastCollisionSide(lastCollisionSide: string) {
        this._lastCollisionSide = lastCollisionSide;
    }

    public notifyObservers(collision: Collision) {
        this.observers.forEach((observer) => {
            observer.onCollision(collision);
        });
    }

    public registerObserver(observer: IObserver) {
        this.observers.push(observer);
    }

}