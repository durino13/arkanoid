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

            let position;

            let dx, dy;

            // TODO Dorobit rohove kolizie

            // G1
            // if (object1.getTopLeftCornerPosition().x < object1.getTopLeftCornerPosition().x && object1.getTopLeftCornerPosition().y < object2.getTopLeftCornerPosition().y) {
            //     dx = (object1.getTopLeftCornerPosition().x + object1.width() - object2.getTopLeftCornerPosition().x);
            //     dy = (object1.getTopLeftCornerPosition().y + object1.height() - object2.getTopLeftCornerPosition().y);
            //
            //     if (dx > dy) {
            //         position = Collision.SIDE_TOP;
            //     } else {
            //         position = Collision.SIDE_LEFT;
            //     }
            // }

            // G2
            if ((object1.getTopLeftCornerPosition().x > object2.getTopLeftCornerPosition().x) && ((object1.getTopLeftCornerPosition().x + object1.width()) < (object2.getTopLeftCornerPosition().x + object2.width())) && (object1.getTopLeftCornerPosition().y < object2.getTopLeftCornerPosition().y)) {
                position = Collision.SIDE_TOP;
            }

            // G4
            if ((object1.getTopLeftCornerPosition().y > object2.getTopLeftCornerPosition().y) && ((object1.getTopLeftCornerPosition().y + object1.height()) < (object2.getTopLeftCornerPosition().y + object2.height())) && (object1.getTopLeftCornerPosition().x > object2.getTopLeftCornerPosition().x)) {
                position = Collision.SIDE_RIGHT;
            }

            // G6
            if ((object1.getTopLeftCornerPosition().x > object2.getTopLeftCornerPosition().x) && ((object1.getTopLeftCornerPosition().x + object1.width()) < (object2.getTopLeftCornerPosition().x + object2.width())) && (object1.getTopLeftCornerPosition().y > object2.getTopLeftCornerPosition().y)) {
                position = Collision.SIDE_BOTTOM;
            }

            // G8
            if ((object1.getTopLeftCornerPosition().y > object2.getTopLeftCornerPosition().y) && ((object1.getTopLeftCornerPosition().y + object1.height()) < (object2.getTopLeftCornerPosition().y + object2.height())) && (object1.getTopLeftCornerPosition().x < object2.getTopLeftCornerPosition().x)) {
                position = Collision.SIDE_LEFT;
            }

            return new Collision(position);

        }
        return false;
    }

    public getColisionSide() {
        return this.colisionSide;
    }

}