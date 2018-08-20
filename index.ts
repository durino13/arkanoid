import { ArkanoidGame } from './src/arkanoid';

document.addEventListener('DOMContentLoaded', async function() {

    let game = new ArkanoidGame();
    await game.loadLevel(1);
    game.play();

}, false);