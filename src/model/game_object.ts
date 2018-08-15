import { Position } from './position';

export abstract class IGameObject {

    protected _color: string;

    protected _width: number;

    protected _height: number;

    protected _posStart: Position;

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get posStart() {
        return this._posStart;
    }

    set posStart(posStart: Position) {
        this._posStart = posStart;
    }
    
    /*
    |--------------------------------------------------------------------------
    | Abstract methods
    |--------------------------------------------------------------------------
    */

    abstract draw();

    abstract getTopLeftCornerPosition();


}