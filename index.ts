import { ArkanoidGame } from './src/arkanoid';

document.addEventListener('DOMContentLoaded', function() {
    let game = new ArkanoidGame();
    game.play();
}, false);