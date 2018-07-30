import { Player } from './model/player';
import { Position } from './model/position';
import { Ball } from './model/ball';
import { Playground } from './model/playground';
import { World } from './model/world';
import { Obstacle } from './model/obstacle';

export class ArkanoidGame {

    protected _canvas;

    protected _ctx;

    protected _world;

    protected _player: Player;

    protected _ball: Ball;

    protected _obstacle: Obstacle;

    constructor() {
        this.init();
    }

    init() {
        // Create the canvas
        this._canvas = document.getElementById("arkanoidCanvas");
        this._ctx = this._canvas.getContext("2d");

        // set the canvas width and height
        this._canvas.width = Playground._width;
        this._canvas.height = Playground._height;

        // Create the world
        this._world = new World();

        // Player position
        let playerPos = new Position(this._canvas.width / 2 - Player._width / 2, this._canvas.height - Player._height);
        this._player = new Player(this._ctx, playerPos);

        // Ball object
        let ballPos = new Position(Playground.getCenterWidth(), Playground._height - Player._height - Ball._radius);
        this._ball = new Ball(this._ctx, ballPos, this._world);

        // Screen bottom
        let obstaclePos = new Position(0, Playground._height - 1);
        this._obstacle = new Obstacle(this._ctx, obstaclePos);

        // Add objects into the world
        this._world.addObject(this._player);
        this._world.addObject(this._obstacle);
        this._world.addObject(this._ball);
    }

    play() {

        // Clear the _canvas first
        this.clear();

        // Render the world
        this._world.draw();

        // Request to refresh the _canvas
        requestAnimationFrame(this.play.bind(this));
    }

    clear() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

}