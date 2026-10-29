import { CONFIG } from "./config.js";

const SCREEN = {
  START: "start",
  PLAYING: "playing",
  GAME_OVER: "game-over",
};

export function createGame(canvas, context) {
  const state = {
    screen: SCREEN.START,
    player: {
      x: getPlayerStartX(canvas),
      y: getPlayerY(canvas),
    },
    pressedKeys: new Set(),
  };

  function resetGame() {
    state.screen = SCREEN.PLAYING;
    state.player.x = getPlayerStartX(canvas);
    state.player.y = getPlayerY(canvas);
    state.pressedKeys.clear();
  }

  function handleKeyDown(event) {
    if (event.code === "Space") {
      event.preventDefault();
      if (state.screen === SCREEN.START || state.screen === SCREEN.GAME_OVER) {
        resetGame();
      }
      return;
    }

    if (state.screen !== SCREEN.PLAYING) {
      return;
    }

    if (isMovementKey(event.code)) {
      event.preventDefault();
      state.pressedKeys.add(event.code);
    }
  }

  function handleKeyUp(event) {
    state.pressedKeys.delete(event.code);
  }

  function update(deltaTime) {
    if (state.screen !== SCREEN.PLAYING) {
      return;
    }

    const direction = getMovementDirection();
    const nextX = state.player.x + direction * CONFIG.player.speed * deltaTime;
    const maximumX = canvas.width - CONFIG.player.width;
    state.player.x = Math.max(0, Math.min(nextX, maximumX));
  }

  function render() {
    drawBackground();

    if (state.screen === SCREEN.START) {
      drawMessage(CONFIG.visual.title, CONFIG.visual.instruction);
      return;
    }

    if (state.screen === SCREEN.GAME_OVER) {
      drawMessage(CONFIG.visual.gameOverTitle, CONFIG.visual.gameOverInstruction);
      return;
    }

    drawPlayer();
  }

  return { handleKeyDown, handleKeyUp, render, resetGame, update };

  function drawBackground() {
    context.fillStyle = CONFIG.visual.backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  function drawMessage(title, instruction) {
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = CONFIG.visual.primaryColor;
    context.font = CONFIG.visual.titleFont;
    context.fillText(title, canvas.width / 2, canvas.height / 2 - 32);
    context.fillStyle = CONFIG.visual.accentColor;
    context.font = CONFIG.visual.instructionFont;
    context.fillText(instruction, canvas.width / 2, canvas.height / 2 + 28);
    resetTextAlignment();
  }

  function drawPlayer() {
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = CONFIG.player.font;
    context.fillText(
      CONFIG.player.emoji,
      state.player.x + CONFIG.player.width / 2,
      state.player.y + CONFIG.player.height / 2,
    );
    resetTextAlignment();
  }

  function resetTextAlignment() {
    context.textAlign = "start";
    context.textBaseline = "alphabetic";
  }

  function getMovementDirection() {
    const movingLeft = state.pressedKeys.has("ArrowLeft") || state.pressedKeys.has("KeyA");
    const movingRight = state.pressedKeys.has("ArrowRight") || state.pressedKeys.has("KeyD");
    return Number(movingRight) - Number(movingLeft);
  }
}

function getPlayerStartX(canvas) {
  return (canvas.width - CONFIG.player.width) / 2;
}

function getPlayerY(canvas) {
  return canvas.height - CONFIG.player.height - CONFIG.player.bottomPadding;
}

function isMovementKey(code) {
  return ["ArrowLeft", "KeyA", "ArrowRight", "KeyD"].includes(code);
}