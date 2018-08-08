import { Obstacle } from './obstacle';
import { Position } from './position';
import { CollisionManager } from './collisionManager';

export class Playground {

    public static readonly _width = 842;

    public static readonly _height = 600;

    public static getCenterWidth() {
        return Playground._width / 2;
    }

    public static getBricks(ctx, collisionManager: CollisionManager) {

        let bricks = [];

        let brickWidth = 80;

        let brickHeight = 20;

        let gap = 2;

        let topLeftCornerX = 10 + gap;

        let topLeftCornerY = 10;

        for (let row = 0; row < 4; row++) {

            let brickTopLeftCorner;
            let brickBottomRightCorner;

            for (let column = 0; column < 10; column++) {

                brickTopLeftCorner = new Position(topLeftCornerX, topLeftCornerY);
                brickBottomRightCorner = new Position(topLeftCornerX + brickWidth, topLeftCornerY + brickHeight);
                let newBrick = new Obstacle(ctx, collisionManager, brickTopLeftCorner, brickBottomRightCorner, 'green');
                bricks.push(newBrick);
                topLeftCornerX = topLeftCornerX + brickWidth + gap;

            }

            topLeftCornerX = 10 + gap;
            topLeftCornerY = topLeftCornerY + brickHeight + gap;

        }

        return bricks;

    }

}