import { IGameObject } from './game_object';
import { Playground } from './playground';
import { Position } from './position';

export class Obstacle extends IGameObject{

    protected _ctx;

    protected _position;

    constructor(ctx, position: Position) {
        super();
        this._ctx = ctx;
        this._position = position;
    }

    draw() {
        // The obstacle is invisible
        this._ctx.fillStyle = 'red';
        this._ctx.fillRect(this._position.x, this._position.y, this.width(), this.height());
    }

    height() {
        return 10;
    }

    width() {
        return Playground._width;
    }

}