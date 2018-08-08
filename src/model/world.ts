import { IGameObject } from './game_object';

export class World {

    protected gameOver: false;

    protected gameObjects: Array<IGameObject> = [];

    addObject(object: IGameObject) {
        this.gameObjects.push(object);
    }

    addObjects(objects: Array<IGameObject>) {
        this.gameObjects = this.gameObjects.concat(objects);
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

}