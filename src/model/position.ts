export class Position {

    private _x;

    private _y;

    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    public static getNextPosition(speed: number, angle: number, startPosition: Position): Position {
        let radians = angle * Math.PI/ 180;
        let xunits = Math.cos(radians) * speed;
        let yunits = - Math.sin(radians) * speed;
        return new Position(startPosition.x + xunits, startPosition.y + yunits);
    }

}