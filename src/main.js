import { CONFIG } from "./config.js";
import { createGame } from "./game.js";

const canvas = document.querySelector("#game-canvas");
const context = canvas.getContext("2d");

canvas.width = CONFIG.canvas.width;
canvas.height = CONFIG.canvas.height;

const game = createGame(canvas, context);

document.addEventListener("keydown", game.handleKeyDown);
document.addEventListener("keyup", game.handleKeyUp);

let previousTimestamp = 0;

function frame(timestamp) {
  const deltaTime = previousTimestamp === 0
    ? 0
    : (timestamp - previousTimestamp) / 1000;

  previousTimestamp = timestamp;
  game.update(deltaTime);
  game.render();
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);