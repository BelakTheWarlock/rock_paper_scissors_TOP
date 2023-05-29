import { Game } from "./game.js"

const game = new Game();

const pickRock =
    document.getElementById("throw-rock")
    .addEventListener("click", () => game.playRound(game.throws.rock));

const pickPaper =
    document.getElementById("throw-paper")
    .addEventListener("click", () => game.playRound(game.throws.paper));

const pickScissors =
    document.getElementById("throw-scissors")
    .addEventListener("click", () => game.playRound(game.throws.scissors));