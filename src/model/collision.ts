import { IGameObject } from './game_object';
import { Position } from './position';

export class Collision {

    public static readonly SIDE_TOP = 'SIDE_TOP';
    public static readonly SIDE_BOTTOM = 'SIDE_BOTTOM';
    public static readonly SIDE_LEFT = 'SIDE_LEFT';
    public static readonly SIDE_RIGHT = 'SIDE_RIGHT';

    protected _collisionObject1;

    protected _collisionObject2;

    protected _collisionSide;

    constructor(collisionObject1: IGameObject, collisionObject2: IGameObject, colisionSide: string) {
        this._collisionSide = colisionSide;
        this._collisionObject1 = collisionObject1;
        this._collisionObject2 = collisionObject2;
    }

    get collisionSide() {
        return this._collisionSide;
    }

    get collisionObject1() {
        return this._collisionObject1;
    }

    get collisionObject2() {
        return this._collisionObject2;
    }

}