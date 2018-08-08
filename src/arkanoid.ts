import { Player } from './model/player';
import { Position } from './model/position';
import { Ball } from './model/ball';
import { Playground } from './model/playground';
import { World } from './model/world';
import { Wall, Obstacle } from './model/obstacle';
import { CollisionManager } from './model/collisionManager';

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

    protected _collisionManager: CollisionManager;

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

        // Create collision manager
        this._collisionManager = new CollisionManager();

        // Player position
        let playerPos = new Position(this._canvas.width / 2 - Player._width / 2, this._canvas.height - Player._height);
        this._player = new Player(this._ctx, playerPos);

        // Ball object
        let ballPos = new Position(Playground.getCenterWidth(), Playground._height - Player._height - Ball._radius);
        this._ball = new Ball(this._ctx, this._collisionManager, ballPos, this._world);

        // Screen top border
        this._obstacleTop = new Wall(this._ctx, this._collisionManager, new Position(0, 0), new Position(Playground._width, 10));

        // Wall left
        this._obstacleLeft = new Wall(this._ctx, this._collisionManager, new Position(0, 0), new Position(10, Playground._height));

        // Wall right
        this._obstacleRight = new Wall(this._ctx, this._collisionManager, new Position(Playground._width - 10, 0), new Position(Playground._width, Playground._height));

        // Screen bottom
        this._obstacleBottom = new Wall(this._ctx, this._collisionManager, new Position(0, Playground._height - 1), new Position(Playground._width, Playground._height - 1));

        // Add objects into the world
        this._world.addObject(this._player);
        this._world.addObject(this._obstacleBottom);
        this._world.addObject(this._obstacleTop);
        this._world.addObject(this._obstacleLeft);
        this._world.addObject(this._obstacleRight);
        this._world.addObjects(Playground.getBricks(this._ctx, this._collisionManager));
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