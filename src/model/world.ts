import { IGameObject } from './game_object';
import { CollisionDetector } from './collision_detector';

export class World {

    protected gameObjects: Array<IGameObject> = [];

    addObject(object: IGameObject) {
        this.gameObjects.push(object);
    }

    getObjects() {
        return this.gameObjects;
    }

    draw() {
        this.gameObjects.forEach(function(object) {
            object.draw();
        })
    }

    detectCollision() {

    }

}