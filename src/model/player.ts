import { Position } from './position';

let ARROW_MAP = {
    37: 'left',
    40: 'up',
    39: 'right',
    38: 'down'
};

export class Player {

    public static readonly _width = 80;

    public static readonly _height = 15;

    private _ctx;

    private _color: string;

    private _position: Position;

    private _speed: number;

    constructor(ctx, position: Position) {
        this._ctx = ctx;
        this._position = position;
        this._color = 'orange';
        this._speed = 15;
        document.addEventListener('keydown', this.move.bind(this));
    }

    get color(): string {
        return this.color;
    }

    set color(value: string) {
        this.color = value;
    }

    draw() {
        this._ctx.fillStyle = this._color;
        this._ctx.fillRect(this._position.x, this._position.y, Player._width, Player._height);
    }

    move(e) {

        let arrow = ARROW_MAP[e.keyCode];

        if (arrow === 'left') {
            this._position.x -= this._speed;
        }
        if (arrow === 'right') {
            this._position.x += this._speed;
        }

    }

}