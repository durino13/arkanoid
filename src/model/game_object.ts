import { Position } from './position';

export abstract class IGameObject {

    protected _color: string;

    protected _width: number;

    protected _height: number;

    protected _position: Position;

    protected _visible: boolean;

    abstract draw();

    abstract getTopLeftCornerPosition();

    get posStart(): Position {
        return this._position;
    }

    set posStart(position: Position) {
        this._position = position;
    }

    get color() {
        return this._color;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }
    
}