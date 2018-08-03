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
        let c1 = object1.getTopLeftCornerPosition().x <= object2.getTopLeftCornerPosition().x + object2.width();
        let c2 = object2.getTopLeftCornerPosition().x <= object1.getTopLeftCornerPosition().x + object1.width();
        let c3 = object1.getTopLeftCornerPosition().y <= object2.getTopLeftCornerPosition().y + object2.height();
        let c4 = object2.getTopLeftCornerPosition().y <= object1.getTopLeftCornerPosition().y + object1.height();

        // console.log(c3)
        if ( c1 && c2 && c3 && c4) {

            console.log(object2);

            let position;

            if (object1.getTopLeftCornerPosition().x > object2.getTopLeftCornerPosition().x) {
                let dx = (object2.getTopLeftCornerPosition().x + object2.width()) - object1.getTopLeftCornerPosition().x;
                let dy = (object1.getTopLeftCornerPosition().y + object1.height()) - object2.getTopLeftCornerPosition().y;
                if (dx > dy) {
                    if (object1.getTopLeftCornerPosition().y < object2.getTopLeftCornerPosition().y) {
                        position = Collision.SIDE_TOP;
                    } else {
                        position = Collision.SIDE_BOTTOM;
                    }
                } else {
                    if (object1.getTopLeftCornerPosition().x < object2.getTopLeftCornerPosition().x) {
                        position = Collision.SIDE_RIGHT;
                    } else {
                        position = Collision.SIDE_LEFT;
                    }
                }
            }

            return new Collision(position);

        }
        return false;
    }

    public getColisionSide() {
        return this.colisionSide;
    }

}