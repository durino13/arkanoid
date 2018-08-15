import { Player } from './model/player';
import { Position } from './model/position';
import { Ball } from './model/ball';
import { Playground } from './model/playground';
import { World } from './model/world';
import { Wall, Obstacle, BottomWall } from './model/obstacle';
import { CollisionManager } from './model/collisionManager';
import { LevelLoader } from './lib/levelLoader';
import { IGameObject } from './model/game_object';

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

    public _keyState = {};

    constructor() {
        this.initBasicObjects();
    }

    initBasicObjects() {

        // Create the canvas
        this._canvas = document.getElementById("arkanoidCanvas");
        this._canvas.style.background = "url('resources/background.jpg')";
        this._ctx = this._canvas.getContext("2d");

        // set the canvas width and height
        this._canvas.width = Playground._width;
        this._canvas.height = Playground._height;

        // Create collision manager
        this._collisionManager = new CollisionManager();

        // Create the world
        this._world = new World(this._ctx, this._collisionManager);

        // Player position
        let playerPos = new Position(this._canvas.width / 2 - Player._width / 2, this._canvas.height - Player._height);
        this._player = new Player(this, this._ctx, this._collisionManager, playerPos);

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
        this._obstacleBottom = new BottomWall(this._ctx, this._collisionManager, new Position(0, Playground._height - 1), new Position(Playground._width, Playground._height - 1), 'red', this._world);

        // Add objects into the world
        this._world.addObject(this._player);
        this._world.addObject(this._obstacleBottom);
        this._world.addObject(this._obstacleTop);
        this._world.addObject(this._obstacleLeft);
        this._world.addObject(this._obstacleRight);
        this._world.addObject(this._ball);

    }

    loadLevel() {
        let levelLoader = new LevelLoader();
        return levelLoader.readLevelDefinition(1)
            .then((gameObjects) => {
                let obstacles: Array<IGameObject> = [];
                // Create game objects from definition
                gameObjects.bricks.forEach((brick) => {
                    let width = 80;
                    let height = 20;
                    obstacles.push(new Obstacle(this._ctx, this._collisionManager, new Position(brick.column * width, brick.row * height ), new Position(brick.column * width + width, brick.row * height + height)));
                });
                // throw new Error();
                this._world.addObjects(obstacles);
            })
    }

    get world() {
        return this._world;
    }

    play() {

        if (this._keyState[37]) {
            this._player.posStart.x -= this._player.speed;
        }

        if (this._keyState[39]) {
            this._player.posStart.x += this._player.speed;
        }

        // Clear the _canvas first
        this.clear();

        // Render the world
        this._world.draw();

        // Request next frame
        requestAnimationFrame(this.play.bind(this));
    }

    clear() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

}