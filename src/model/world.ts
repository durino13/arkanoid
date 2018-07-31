import { IGameObject } from './game_object';
import { CollisionDetector } from './collision_detector';

export class World {

    protected gameOver: false;

    protected gameObjects: Array<IGameObject> = [];

    addObject(object: IGameObject) {
        this.gameObjects.push(object);
    }

    getObjects() {
        return this.gameObjects;
    }

    draw() {
        if (!this.gameOver) {
            this.gameObjects.forEach(function(object) {
                object.draw();
            })
        }
    }

    detectCollision() {

    }

}