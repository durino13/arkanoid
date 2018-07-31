import { IGameObject } from './game_object';
import { Playground } from './playground';
import { Position } from './position';

export class Obstacle extends IGameObject{

    protected _ctx;

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

    hit() {
        console.log('I got hit');
    }

    height() {
        return 1;
    }

    width() {
        return Playground._width;
    }

}