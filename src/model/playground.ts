import { Brick, Obstacle } from './obstacle';
import { Position } from './position';
import { CollisionManager } from './collisionManager';

export class Playground {

    public static readonly _width = 1050;

    public static readonly _height = 800;

    public static getCenterWidth() {
        return Playground._width / 2;
    }

}