import { IGameObject } from './game_object';
import { Position } from './position';

export class Text extends IGameObject {

    protected _ctx;

    protected _text;

    protected _pos;

    constructor(ctx, pos: Position) {
        super();
        this._pos = pos;
        this._ctx = ctx;
    }

    set text(value: string) {
        this._text = value;
    }

    draw() {
        this._ctx.font="20px Arial";
        this._ctx.fillStyle = 'white';
        this._ctx.fillText(this._text, this._pos.x, this._pos.y);
    }

    getTopLeftCornerPosition() {
        return this._pos;
    }

}