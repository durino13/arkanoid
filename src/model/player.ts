import { Position } from './position';
import { IGameObject } from './game_object';
import { IObserver } from '../lib/observer';
import { Collision } from './collision';
import { CollisionManager } from './collisionManager';
import { Ball } from './ball';
import { Sprite } from '../lib/sprite';
import { ArkanoidGame } from '../arkanoid';
import { Event } from '../lib/eventEmitter';

export class Player extends IGameObject implements IObserver {

    public static readonly _width = 100;

    public static readonly _height = 26;

    public static readonly _spriteX = 184;

    public static readonly _spriteY = 111;

    public static readonly _speed = 6;

    protected _gameContext: ArkanoidGame;

    protected _ctx;

    protected _speed: number;

    protected _collisionManager: CollisionManager;

    constructor(gameContext: ArkanoidGame, ctx, cm: CollisionManager, position: Position) {
        super();
        this._gameContext = gameContext;
        this._ctx = ctx;
        this._posStart = position;
        this._color = 'orange';
        this._speed = Player._speed;
        this._height = Player._height;
        this._width = Player._width;
        this._collisionManager = cm;
        this._gameContext.eventEmitter.registerObserver(this);
    }

    get speed() {
        return this._speed;
    }

    draw() {
        let sprite = new Sprite(this._ctx, '../resources/paddle.png', this._posStart, new Position(this._width, this._height), new Position(0,0));
        sprite.render();
    }

    getTopLeftCornerPosition() {
        return new Position(this._posStart.x, this._posStart.y);
    }

    calculateAngleAdjustment(ball: Ball) {

        let resultAngle;
        let ballVsPayerCollisionPointX = ball.getTopLeftCornerPosition().x - this.getTopLeftCornerPosition().x;
        let angleDistribution = [ 20,15,10,5,0,0,-5,-10,-15,-20 ];
        let angleDistributionReverse = [ 20,15,10,5,0,0,-5,-10,-15,-20 ];
        let intervalCount = 10;
        let intervalSize = Player._width / intervalCount;
        let intervalStruck = Math.trunc(ballVsPayerCollisionPointX / intervalSize) + 1;

        if (ball.angle >= 270 && ball.angle < 360) {
            resultAngle = angleDistributionReverse[intervalStruck];
        }

        if (ball.angle > 180 && ball.angle < 270) {
            resultAngle = angleDistribution[intervalStruck];
        }

        return resultAngle;
    }

    /*
    |--------------------------------------------------------------------------
    | Collision event
    |--------------------------------------------------------------------------
    */
    
    onEvent(event: Event, collision: Collision) {

        if (event.name === Event.EVENT_ON_COLLISION) {
            if (collision.collisionObject2 === this) {
                let ball = collision.collisionObject1;
                ball.angleAdjustment = this.calculateAngleAdjustment(collision.collisionObject1);

            }
        }

    }

}