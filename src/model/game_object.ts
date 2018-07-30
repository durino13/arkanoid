import { Position } from './position';

export abstract class IGameObject {

    protected _width: number;

    protected _height: number;

    protected _position: Position;

    abstract draw();

    get position(): Position {
        return this._position;
    }

    abstract width();

    abstract height();
    
}