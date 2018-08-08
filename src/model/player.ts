import { Position } from './position';
import { IGameObject } from './game_object';
import { IObserver } from '../general/observer';
import { Collision } from './collision';
import { CollisionManager } from './collisionManager';

let ARROW_MAP = {
    37: 'left',
    40: 'up',
    39: 'right',
    38: 'down'
};

export class Player extends IGameObject implements IObserver {

    public static readonly _width = 80;

    public static readonly _height = 15;

    public static readonly DISTRIBUTION_SIZE = 10;

    protected _ctx;

    protected _speed: number;

    protected _collisionManager: CollisionManager;

    protected _collisionDistributionIndexes: Array<Position>;

    constructor(ctx, cm: CollisionManager, position: Position) {
        super();
        this._ctx = ctx;
        this._position = position;
        this._color = 'orange';
        this._speed = 15;
        this._collisionManager = cm;
        this._collisionManager.registerObserver(this);
        this._collisionDistributionIndexes = [];
        this.calculateCollisionDistribution();
        document.addEventListener('keydown', this.move.bind(this));
    }

    draw() {
        this._ctx.fillStyle = this._color;
        this._ctx.fillRect(this._position.x, this._position.y, Player._width, Player._height);
    }

    move(e) {

        let arrow = ARROW_MAP[e.keyCode];

        if (arrow === 'left') {
            this._position.x -= this._speed;
        }
        if (arrow === 'right') {
            this._position.x += this._speed;
        }

    }

    height() {
        return Player._height;
    }

    width() {
        return Player._width;
    }

    getTopLeftCornerPosition() {
        return new Position(this._position.x, this._position.y);
    }

    /**
     * @param collisionObject2 The object colliding with the ball
     */
    protected calculateCollisionDistribution() {
        let index = 0;
        let regions = this.width() / Player.DISTRIBUTION_SIZE;
        while (index < regions) {
            this._collisionDistributionIndexes.push(new Position(index * Player.DISTRIBUTION_SIZE, index * Player.DISTRIBUTION_SIZE + Player.DISTRIBUTION_SIZE));
            index++;
        }
    }

    calculatePlayerCollisionPointIndex(collisionObject: IGameObject): number {
        let diff = Math.abs(this.getTopLeftCornerPosition().x - collisionObject.getTopLeftCornerPosition().x);
        for (let i = 0; i < this._collisionDistributionIndexes.length; i++) {
            if (diff > this._collisionDistributionIndexes[i].x && diff < this._collisionDistributionIndexes[i].x + Player.DISTRIBUTION_SIZE) {
                return this._collisionDistributionIndexes.length - i;
            }
        }
        return 0;
    }

    /*
    |--------------------------------------------------------------------------
    | Collision event
    |--------------------------------------------------------------------------
    | 
    |
    */
    
    onCollision(collision: Collision) {

        if (collision.collisionObject2 === this) {
            let ball = collision.collisionObject1;
            // Calculate the collision index. Based on this index, we will generate a random ball angle
            let collisionIndex: number = this.calculatePlayerCollisionPointIndex(collision.collisionObject1);
            let angleAdjustment = + (collisionIndex * 6);
            ball.angleAdjustment = angleAdjustment;
        }

    }

}