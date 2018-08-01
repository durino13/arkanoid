import { Position } from './position';

export abstract class IGameObject {

    protected _width: number;

    protected _height: number;

    protected _position: Position;

    abstract draw();

    abstract width();

    abstract height();

    abstract hit();

    abstract getTopLeftCornerPosition();

    get posStart(): Position {
        return this._position;
    }

    set posStart(position: Position) {
        this._position = position;
    }
    
}