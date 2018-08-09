import { Position } from '../model/position';

export class Sprite {

    protected _ctx;

    protected _url;

    protected _pos: Position;

    protected _size;

    protected _spriteLocation: Position;

    constructor(ctx, url: string, pos: Position, size: Position, spriteLocation: Position) {
        this._url = url;
        this._ctx = ctx;
        this._pos = pos;
        this._size = size;
        this._spriteLocation = spriteLocation;
    }

    render() {

        let img = new Image();
        img.src = this._url;

        this._ctx.drawImage(img,
            this._spriteLocation.x, this._spriteLocation.y,
            this._size.x, this._size.y,
            this._pos.x, this._pos.y,
            this._size.x, this._size.y);

    }

}