import { CONFIG } from "./config.js";

const canvas = document.querySelector("#game-canvas");
const context = canvas.getContext("2d");
const state = {
  elapsedTime: 0,
};

canvas.width = CONFIG.canvas.width;
canvas.height = CONFIG.canvas.height;

function update(deltaTime) {
  state.elapsedTime += deltaTime;
}

function render() {
  context.fillStyle = CONFIG.visual.backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = CONFIG.visual.primaryColor;
  context.font = CONFIG.visual.titleFont;
  context.fillText(CONFIG.visual.title, canvas.width / 2, canvas.height / 2 - 32);

  context.fillStyle = CONFIG.visual.accentColor;
  context.font = CONFIG.visual.instructionFont;
  context.fillText(CONFIG.visual.instruction, canvas.width / 2, canvas.height / 2 + 28);

  context.textAlign = "start";
  context.textBaseline = "alphabetic";
}

let previousTimestamp = 0;

function frame(timestamp) {
  const deltaTime = previousTimestamp === 0
    ? 0
    : (timestamp - previousTimestamp) / 1000;

  previousTimestamp = timestamp;
  update(deltaTime);
  render();
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);