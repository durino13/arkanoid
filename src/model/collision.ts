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
        if (object1.getTopLeftCornerPosition().x < object2.getTopLeftCornerPosition().x + object2.width()  && object1.getTopLeftCornerPosition().x + object1.width()  > object2.getTopLeftCornerPosition().x &&
            object1.getTopLeftCornerPosition().y < object2.getTopLeftCornerPosition().y + object2.height() && object1.getTopLeftCornerPosition().y + object1.height() > object2.getTopLeftCornerPosition().y) {

        // TODO kolizie musim spravit pre vsetky rohy lopty .. Momentalne nefunguju spravne. Lopta ide do kolizie, az ked sa objekt dotkne
        // stredu kruznice ..
            return new Collision(Collision.POSITION_TOP, 10);

        }
        return false;
    }

}