import { IGameObject } from './game_object';
import { Collision } from './collision';
import { Ball } from './ball';

export class CollisionManager {

    protected _lastCollisionSide;

    /**
     * Detect collision between 2 objects
     * @param object1
     * @param object2
     * @returns {boolean}
     */
    public determineCollision(object1: IGameObject, object2: IGameObject) {

        // CollisionManager occures when all 4 conditions are met
        let c1 = object1.getTopLeftCornerPosition().x < object2.getTopLeftCornerPosition().x + object2.width;
        let c2 = object2.getTopLeftCornerPosition().x < object1.getTopLeftCornerPosition().x + object1.width;
        let c3 = object1.getTopLeftCornerPosition().y < object2.getTopLeftCornerPosition().y + object2.height;
        let c4 = object2.getTopLeftCornerPosition().y < object1.getTopLeftCornerPosition().y + object1.height;

        if ( c1 && c2 && c3 && c4) {

            // console.log('------------------------------------');

            let collisionSide;

            let dx, dy;

            // G1
            if ((object1.getTopLeftCornerPosition().x < object2.getTopLeftCornerPosition().x) && (object1.getTopLeftCornerPosition().y < object2.getTopLeftCornerPosition().y)) {
                // console.log('G1');
                dx = (object1.getTopLeftCornerPosition().x + object1.width - object2.getTopLeftCornerPosition().x);
                dy = (object1.getTopLeftCornerPosition().y + object1.height - object2.getTopLeftCornerPosition().y);

                if (dx > dy) {
                    collisionSide = Collision.SIDE_TOP;
                } else {
                    collisionSide = Collision.SIDE_LEFT;
                }
            }

            // G2
            if ((object1.getTopLeftCornerPosition().x > object2.getTopLeftCornerPosition().x) && ((object1.getTopLeftCornerPosition().x + object1.width) < (object2.getTopLeftCornerPosition().x + object2.width)) && (object1.getTopLeftCornerPosition().y < object2.getTopLeftCornerPosition().y)) {
                // console.log('G2');
                collisionSide = Collision.SIDE_TOP;
            }

            // G3
            if ((object1.getTopLeftCornerPosition().x < object2.getTopLeftCornerPosition().x + object2.width) && (object1.getTopLeftCornerPosition().x + object1.width) > (object2.getTopLeftCornerPosition().x + object2.width) && (object1.getTopLeftCornerPosition().y < object2.getTopLeftCornerPosition().y)) {
                // console.log('G3');
                dx = ((object2.getTopLeftCornerPosition().x + object2.width) - object1.getTopLeftCornerPosition().x);
                dy = ((object1.getTopLeftCornerPosition().y + object1.height) - object2.getTopLeftCornerPosition().y);

                if (dx > dy) {
                    collisionSide = Collision.SIDE_TOP;
                } else {
                    collisionSide = Collision.SIDE_RIGHT;
                }
            }

            // G4
            if ((object1.getTopLeftCornerPosition().y > object2.getTopLeftCornerPosition().y) && ((object1.getTopLeftCornerPosition().y + object1.height) < (object2.getTopLeftCornerPosition().y + object2.height)) && (object1.getTopLeftCornerPosition().x > object2.getTopLeftCornerPosition().x)) {
                // console.log('G4');
                collisionSide = Collision.SIDE_RIGHT;
            }

            // G5
            if ((object1.getTopLeftCornerPosition().x < object2.getTopLeftCornerPosition().x + object2.width) && (object1.getTopLeftCornerPosition().y < object2.getTopLeftCornerPosition().y + object2.height) && (object1.getTopLeftCornerPosition().y + object1.height > object2.getTopLeftCornerPosition().y + object2.height) && (object1.getTopLeftCornerPosition().x + object1.width > object2.getTopLeftCornerPosition().x + object2.width)) {
                // console.log('G5');
                dx = (object2.getTopLeftCornerPosition().x + object2.width) - object1.getTopLeftCornerPosition().x;
                dy = (object2.getTopLeftCornerPosition().y + object2.height) - object1.getTopLeftCornerPosition().x;

                if (dx > dy) {
                    collisionSide = Collision.SIDE_BOTTOM;
                } else {
                    collisionSide = Collision.SIDE_RIGHT;
                }
            }

            // G6
            if ((object1.getTopLeftCornerPosition().x > object2.getTopLeftCornerPosition().x) && ((object1.getTopLeftCornerPosition().x + object1.width) < (object2.getTopLeftCornerPosition().x + object2.width)) && (object1.getTopLeftCornerPosition().y > object2.getTopLeftCornerPosition().y)) {
                // console.log('G6');
                collisionSide = Collision.SIDE_BOTTOM;
            }

            // G7
            if ((object1.getTopLeftCornerPosition().x < object2.getTopLeftCornerPosition().x) && (object1.getTopLeftCornerPosition().y < object2.getTopLeftCornerPosition().y + object2.height) && (object1.getTopLeftCornerPosition().y + object1.height > object2.getTopLeftCornerPosition().y + object2.height)) {
                // console.log('G7');
                dx = (object1.getTopLeftCornerPosition().x + object1.width) - object2.getTopLeftCornerPosition().x;
                dy = (object1.getTopLeftCornerPosition().y + object1.height) - object2.getTopLeftCornerPosition().y;

                if (dx > dy) {
                    collisionSide = Collision.SIDE_LEFT;
                } else {
                    collisionSide = Collision.SIDE_BOTTOM;
                }

            }

            // G8
            if (((object1.getTopLeftCornerPosition().x < object2.getTopLeftCornerPosition().x) && ((object1.getTopLeftCornerPosition().x + object1.width) > object2.getTopLeftCornerPosition().x)) && (object1.getTopLeftCornerPosition().y > object2.getTopLeftCornerPosition().y) && ((object1.getTopLeftCornerPosition().y + object1.height < object2.getTopLeftCornerPosition().y + object2.height))) {
                // console.log('G8');
                collisionSide = Collision.SIDE_LEFT;
            }

            // Niekedy sa stava, ze kolizia nastava 2x na tej istej hrane, co sa nesmie stat .. Preto preskakujem
            if (this.isNextCollisionSideAllowed(collisionSide)) {
                this.lastCollisionSide = collisionSide;
                return new Collision(object1, object2, collisionSide);
            }

        }

        // No collision
        return false;
    }

    set lastCollisionSide(lastCollisionSide: string) {
        this._lastCollisionSide = lastCollisionSide;
    }

    isNextCollisionSideAllowed(collisionSide) {
        return this._lastCollisionSide !== collisionSide;
    }

}