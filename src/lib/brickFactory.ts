import { Brick, Stone } from '../model/obstacle';
import { Position } from '../model/position';
import { CollisionManager } from '../model/collisionManager';
import { ArkanoidGame } from '../arkanoid';

export class BrickFactory {

    createBrick(ctx, gc: ArkanoidGame, cm: CollisionManager, brick) {

        let width = 80;
        let height = 27;

        let obj;
        if (brick.type === 'brick') {
            obj = new Brick(ctx, gc, cm, new Position(brick.column * width, brick.row * height ), new Position(brick.column * width + width, brick.row * height + height));
        } else if (brick.type === 'stone') {
            obj = new Stone(ctx, gc, cm, new Position(brick.column * width, brick.row * height ), new Position(brick.column * width + width, brick.row * height + height));
        }

        return obj;

    }

}