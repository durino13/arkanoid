import { ArkanoidGame } from './src/arkanoid';
import { LevelLoader } from './src/lib/levelLoader';
import { IGameObject } from './src/model/game_object';
import { Obstacle } from './src/model/obstacle';
import { Position } from './src/model/position';

document.addEventListener('DOMContentLoaded', function() {

    let game = new ArkanoidGame();
    game.loadLevel()
        .then(() => {
            let obstacles: Array<IGameObject> = [];

            // Add bricks
            game.world.addObjects(obstacles);

            game.play();
        });

}, false);