import { IGameObject } from './game_object';
import { Playground } from './playground';
import { Position } from './position';

export class Obstacle extends IGameObject{

    protected _ctx;

    protected _posStart;

    protected _posEnd;

    constructor(ctx, posStart: Position, posEnd: Position) {
        super();
        this._ctx = ctx;
        this._posStart = posStart;
        this._posEnd = posEnd;
    }

    draw() {
        // The obstacle is invisible
        this._ctx.fillStyle = 'red';
        this._ctx.fillRect(this._posStart.x, this._posStart.y, this._posEnd.x, this._posEnd.y);
    }

    hit() {
        console.log('I got hit');
    }

    height() {
        return this._posEnd.y - this._posStart.y;
    }

    width() {
        return this._posEnd.x - this._posStart.x;
    }

    getTopLeftCornerPosition() {
        return new Position(this._posStart.x, this._posStart.y);
    }

}