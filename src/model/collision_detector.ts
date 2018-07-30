import { IGameObject } from './game_object';

export class CollisionDetector {

    /**
     * Detect collision between 2 objects
     * @param object1
     * @param object2
     * @returns {boolean}
     */
    public static isColision(object1: IGameObject, object2: IGameObject) {
        if (object1.position.x < object2.position.x + object2.width()  && object1.position.x + object1.width()  > object2.position.x &&
            object1.position.y < object2.position.y + object2.height() && object1.position.y + object1.height() > object2.position.y) {
            return true;
        }
        return false;
    }

}