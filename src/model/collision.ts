import { IGameObject } from './game_object';

export class Collision {

    protected static readonly POSITION_TOP = 'POSITION_TOP';
    protected static readonly POSITION_BOTTOM = 'POSITION_BOTTOM';

    protected colisionSide;

    /**
     * The possition of the collision
     */
    protected colisionPosition;  // 'top', 'right', 'left', 'bottom'


    constructor(colisionSide, colisionPosition) {
        this.colisionSide = colisionSide;
        this.colisionPosition = colisionPosition;
    }

    /**
     * Detect collision between 2 objects
     * @param object1
     * @param object2
     * @returns {boolean}
     */
    public static isColision(object1: IGameObject, object2: IGameObject) {
        let c1 = object1.getTopLeftCornerPosition().x < object2.getTopLeftCornerPosition().x + object2.width();
        let c2 = object2.getTopLeftCornerPosition().x < object1.getTopLeftCornerPosition().x + object1.width();
        let c3 = object1.getTopLeftCornerPosition().y < object2.getTopLeftCornerPosition().y + object2.height();
        let c4 = object2.getTopLeftCornerPosition().y < object1.getTopLeftCornerPosition().y + object1.height();

        // console.log(c3)
        if ( c1 && c2 && c3 && c4) {

            // console.log('aaaaaaaaaaaaaaaaa');
            // console.log(object1.getTopLeftCornerPosition().x < object2.getTopLeftCornerPosition().x + object2.width())
            // console.log(object2.getTopLeftCornerPosition().x)
            // console.log(object2.getTopLeftCornerPosition().y)
            return new Collision(Collision.POSITION_TOP, 10);

        }
        return false;
    }

}