import { Position } from '../model/position';

export class Sprite {

    protected _ctx;

    protected _url;

    protected _pos: Position;

    protected _size;

    protected _speed;

    protected _frames;

    protected _index;

    protected _dir;

    protected _once;

    constructor(ctx, url, pos: Position, size, speed, frames, dir, once) {
        this._url = url;
        this._ctx = ctx;
        this._pos = pos;
        this._size = size;
        this._speed = speed;
        this._frames = frames;
        this._index = 0;
        this._dir = dir;
        this._once = once;
    }

    render() {
        var frame;

        if(this._speed > 0) {
            var max = this._frames.length;
            var idx = Math.floor(this._index);
            frame = this._frames[idx % max];

            if(this._once && idx >= max) {
                this._once = true;
                return;
            }
        }
        else {
            frame = 0;
        }


        // var x = this._pos[0];
        // var y = this._pos[1];
        //
        // if(this._dir == 'vertical') {
        //     y += frame * this._size[1];
        // }
        // else {
        //     x += frame * this._size[0];
        // }

        let img = new Image();
        img.src = '../resources/arkanoid_sprite.png';

        this._ctx.drawImage(img,
            this._pos.x, this._pos.y,
            this._size[0], this._size[1],
            0, 0,
            this._size[0], this._size[1]);

        // this._ctx.drawImage(resources.get(this._url),
        //     x, y,
        //     this._size[0], this._size[1],
        //     0, 0,
        //     this._size[0], this._size[1]);
    }

}