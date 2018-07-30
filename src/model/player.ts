import { Position } from './position';
import { IGameObject } from './game_object';

let ARROW_MAP = {
    37: 'left',
    40: 'up',
    39: 'right',
    38: 'down'
};

export class Player extends IGameObject {

    public static readonly _width = 80;

    public static readonly _height = 15;

    private _ctx;

    private _color: string;

    private _speed: number;

    constructor(ctx, position: Position) {
        super();
        this._ctx = ctx;
        this._position = position;
        this._color = 'orange';
        this._speed = 15;
        document.addEventListener('keydown', this.move.bind(this));
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

    height() {
        return Player._height;
    }

    width() {
        return Player._width;
    }

}