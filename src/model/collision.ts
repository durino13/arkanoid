import { IGameObject } from './game_object';

export class Collision {

    public static readonly SIDE_TOP = 'SIDE_TOP';
    public static readonly SIDE_BOTTOM = 'SIDE_BOTTOM';
    public static readonly SIDE_LEFT = 'SIDE_LEFT';
    public static readonly SIDE_RIGHT = 'SIDE_RIGHT';

    protected _collisionObject;

    protected _collisionSide;

    constructor(collisionObject: IGameObject, colisionSide: string) {
        this._collisionSide = colisionSide;
        this._collisionObject = collisionObject;
    }

    get collisionSide() {
        return this._collisionSide;
    }

    get collisionObject() {
        return this._collisionObject;
    }

}