import { Player } from './model/player';
import { Position } from './model/position';
import { Ball } from './model/ball';
import { Playground } from './model/playground';
import { World } from './model/world';
import { Wall, Obstacle, BottomWall } from './model/obstacle';
import { CollisionManager } from './model/collisionManager';
import { LevelLoader } from './lib/levelLoader';
import { IGameObject } from './model/game_object';
import { BrickFactory } from './lib/brickFactory';
import { Text } from './model/text';
import { Event, EventEmitter } from './lib/eventEmitter';

export class ArkanoidGame {

    protected _canvas;

    protected _ctx;

    // TODO Pass game object instead of partial objects
    protected _world;

    protected _player: Player;

    protected _ball: Ball;

    protected _obstacleBottom: Obstacle;

    protected _obstacleTop: Obstacle;

    protected _obstacleLeft: Obstacle;

    protected _obstacleRight: Obstacle;

    protected _collisionManager: CollisionManager;

    protected _levelInfo: Text;

    public _keyState = {};

    protected _currentLevel;

    protected _eventEmitter;

    constructor() {

        // Create the canvas
        this._canvas = document.getElementById("arkanoidCanvas");
        this._canvas.style.background = "url('resources/background.jpg')";
        this._ctx = this._canvas.getContext("2d");

        // set the canvas width and height
        this._canvas.width = Playground._width;
        this._canvas.height = Playground._height;

        // Create collision manager
        this._collisionManager = new CollisionManager();

        // Event emitter
        this._eventEmitter = new EventEmitter();

        // Create the world
        this._world = new World(this._ctx, this, this._collisionManager);

        // Init current level
        this._currentLevel = 1;

        this.eventEmitter.registerObserver(this);

        document.addEventListener('keydown', (e) => {
            this._keyState[e.keyCode] = true;
        });
        document.addEventListener('keyup', (e) => {
            this._keyState[e.keyCode] = false;

            // if Spacebar was pressed, emit the event ..
            if (e.keyCode === 32) {
                this.eventEmitter.emit(new Event(Event.EVENT_SPACEBAR_PRESS));
            }
        });

    }

    initBasicObjects() {

        this._world._gameObjects = [];

        // Player position
        let playerPos = new Position(this._canvas.width / 2 - Player._width / 2, this._canvas.height - Player._height);
        this._player = new Player(this, this._ctx, this._collisionManager, playerPos);

        // Ball object
        let ballPos = new Position(Playground.getCenterWidth(), Playground._height - Player._height - Ball._radius);
        this._ball = new Ball(this._ctx, this, this._collisionManager, ballPos, this._world);

        // Screen top border
        this._obstacleTop = new Wall(this._ctx, this, this._collisionManager, new Position(0, 0), new Position(Playground._width, 10));

        // Wall left
        this._obstacleLeft = new Wall(this._ctx, this, this._collisionManager, new Position(0, 0), new Position(10, Playground._height));

        // Wall right
        this._obstacleRight = new Wall(this._ctx, this, this._collisionManager, new Position(Playground._width - 10, 0), new Position(Playground._width, Playground._height));

        // Screen bottom
        this._obstacleBottom = new BottomWall(this._ctx, this, this._collisionManager, new Position(0, Playground._height - 1), new Position(Playground._width, Playground._height - 1), 'red', this._world);

        this._levelInfo = new Text(this._ctx, new Position(Playground._width - 80, 30));
        this._levelInfo.text = 'Level ' + this._currentLevel;

        // Add objects into the world
        this._world.addObject(this._player);
        this._world.addObject(this._obstacleBottom);
        this._world.addObject(this._obstacleTop);
        this._world.addObject(this._obstacleLeft);
        this._world.addObject(this._obstacleRight);
        this._world.addObject(this._ball);
        this._world.addObject(this._levelInfo);

    }

    loadLevel(level: number) {

        // console.log('Loading level ' + level);

        // First init common game objects
        this.initBasicObjects();

        // Then load level specific objects ..
        let levelLoader = new LevelLoader();
        return levelLoader.readLevelDefinition(level)
            .then((gameObjects) => {

                let obstacles: Array<IGameObject> = [];

                // Create game objects from definition
                gameObjects.bricks.forEach((brick) => {
                    let brickFactory = new BrickFactory();
                    let obj = brickFactory.createBrick(this._ctx, this, this._collisionManager, brick);
                    obstacles.push(obj);
                });

                this._world.addObjects(obstacles);
            })
    }

    get world() {
        return this._world;
    }

    get eventEmitter() {
        return this._eventEmitter;
    }

    play() {

        // Handle player movement
        this.handleKeyStrokes();

        // Clear the _canvas first
        this.clear();

        // Render the world
        this._world.draw();

        // Request next frame
        requestAnimationFrame(this.play.bind(this));
    }

    handleKeyStrokes() {

        if (this._keyState[37]) {
            this._player.posStart.x -= this._player.speed;
        }

        if (this._keyState[39]) {
            this._player.posStart.x += this._player.speed;
        }

        // if (this._keyState[32]) {
        //     this._eventEmitter.emit(new Event(Event.EVENT_SPACEBAR_PRESS));
        // }
    }

    clear() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    onEvent(event: Event) {

        if (event.name === Event.EVENT_SPACEBAR_PRESS) {

            if (this.world.isPaused) {
                this._currentLevel = this._currentLevel + 1;
                this.loadLevel(this._currentLevel).then(() => {
                    // Continue the game ..
                    this.world.paused = false;
                })
            }
        }

    }

}