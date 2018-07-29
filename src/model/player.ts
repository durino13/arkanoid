import { Position } from './position';

let ARROW_MAP = {
    37: 'left',
    40: 'up',
    39: 'right',
    38: 'down'
};

export class Player {

    private _ctx;

    private _width: number;

    private _height: number;

    private _color: string;

    private _position: Position;

    private _speed: number;

    constructor(ctx, position: Position) {
        this._ctx = ctx;
        this._position = position;
        this._width = 80;
        this._height = 15;
        this._color = 'black';
        this._speed = 1;
    }

    get width(): number {
        return this.width;
    }

    set width(value: number) {
        this.width = value;
    }

    get height(): number {
        return this.height;
    }

    set height(value: number) {
        this.height = value;
    }

    get color(): string {
        return this.color;
    }

    set color(value: string) {
        this.color = value;
    }

    draw() {
        this._ctx.fillStyle = this._color;
        this._ctx.fillRect(this._position.x, this._position.y, this._width, this._height);
    }

    // move(e) {
    //
    //     console.log(this._position.x);
    //
    //     let arrow = ARROW_MAP[e.keyCode];
    //
    //     if (arrow === 'left') {
    //         this._position.x -= this._speed;
    //     }
    //     if (arrow === 'right') {
    //         this._position.x += this._speed;
    //     }
    //
    // }

}