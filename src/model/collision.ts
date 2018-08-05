import { IGameObject } from './game_object';

export class Collision {

    public static readonly SIDE_TOP = 'SIDE_TOP';
    public static readonly SIDE_BOTTOM = 'SIDE_BOTTOM';
    public static readonly SIDE_LEFT = 'SIDE_LEFT';
    public static readonly SIDE_RIGHT = 'SIDE_RIGHT';

    protected colisionSide;

    constructor(colisionSide) {
        this.colisionSide = colisionSide;
    }

    /**
     * Detect collision between 2 objects
     * @param object1
     * @param object2
     * @returns {boolean}
     */
    public static isCollision(object1: IGameObject, object2: IGameObject) {

        // Collision occures when all 4 conditions are met
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
            if ((object1.getTopLeftCornerPosition().y > object2.getTopLeftCornerPosition().y) && ((object1.getTopLeftCornerPosition().y + object1.height()) < (object2.getTopLeftCornerPosition().y + object2.height())) && (object2.getTopLeftCornerPosition().x < object1.getTopLeftCornerPosition().x + object1.width()) && (object1.getTopLeftCornerPosition().x < object2.getTopLeftCornerPosition().x)) {
                console.log('G8');
                position = Collision.SIDE_LEFT;
            }

            return new Collision(position);

        }

        // No collision
        return false;
    }

    public getColisionSide() {
        return this.colisionSide;
    }

}