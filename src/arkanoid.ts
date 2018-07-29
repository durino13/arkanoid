import { Player } from './model/player';
import { Position } from './model/position';

export class ArkanoidGame {

    protected _canvas;

    protected _ctx;

    protected _playerPosition: Position;

    constructor() {
        this.init();
    }

    init() {
        // Create the canvas
        this._canvas = document.getElementById("arkanoidCanvas");
        this._ctx = this._canvas.getContext("2d");

        // set the canvas width and height
        this._canvas.width = 700;
        this._canvas.height = 900;

        // Player position
        this._playerPosition = new Position(this._canvas.width / 2, 885);
    }

    play() {

        // Clear the _canvas first
        this.clear();

        // Start the game
        this._playerPosition.x += 1;
        let player = new Player(this._ctx, this._playerPosition);
        player.draw();

        // Request to refresh the _canvas
        requestAnimationFrame(this.play.bind(this));
    }

    clear() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

}