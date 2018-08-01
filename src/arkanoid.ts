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

    protected _obstacleBottom: Obstacle;

    protected _obstacleTop: Obstacle;

    protected _obstacleLeft: Obstacle;

    protected _obstacleRight: Obstacle;

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
        this._obstacleBottom = new Obstacle(this._ctx, new Position(0, Playground._height - 1), new Position(Playground._width, Playground._height - 1));

        // Screen top border
        this._obstacleTop = new Obstacle(this._ctx, new Position(0, 1), new Position(Playground._width, 1));

        // Obstacle left
        this._obstacleLeft = new Obstacle(this._ctx, new Position(1, 0), new Position(1, Playground._height));

        // Obstacle right
        this._obstacleRight = new Obstacle(this._ctx, new Position(Playground._width - 1, 0), new Position(Playground._width - 1, Playground._height));

        // Add objects into the world
        this._world.addObject(this._player);
        this._world.addObject(this._obstacleBottom);
        this._world.addObject(this._obstacleTop);
        this._world.addObject(this._obstacleLeft);
        this._world.addObject(this._obstacleRight);
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