import { CONFIG } from "./config.js";
import { loadHighScore, saveHighScore } from "./storage.js";

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
    items: [],
    elapsedTime: 0,
    spawnTimer: 0,
    score: 0,
    lives: CONFIG.game.initialLives,
    highScore: loadHighScore(),
  };

  function resetGame() {
    state.screen = SCREEN.PLAYING;
    state.player.x = getPlayerStartX(canvas);
    state.player.y = getPlayerY(canvas);
    state.pressedKeys.clear();
    state.items = [];
    state.elapsedTime = 0;
    state.spawnTimer = 0;
    state.score = 0;
    state.lives = CONFIG.game.initialLives;
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

    state.elapsedTime += deltaTime;
    state.spawnTimer += deltaTime;
    const spawnInterval = getSpawnInterval();
    while (state.spawnTimer >= spawnInterval) {
      state.spawnTimer -= spawnInterval;
      spawnItem();
    }

    updateItems(deltaTime);
  }

  function render() {
    drawBackground();

    if (state.screen === SCREEN.START) {
      drawMessage(CONFIG.visual.title, CONFIG.visual.instruction);
      return;
    }

    if (state.screen === SCREEN.GAME_OVER) {
      drawGameOver();
      return;
    }

    drawItems();
    drawPlayer();
    drawHud();
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
    context.fillText(
      title,
      canvas.width / 2,
      canvas.height / 2 + CONFIG.visual.titleOffset,
    );
    context.fillStyle = CONFIG.visual.accentColor;
    context.font = CONFIG.visual.instructionFont;
    context.fillText(
      instruction,
      canvas.width / 2,
      canvas.height / 2 + CONFIG.visual.instructionOffset,
    );
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

  function drawItems() {
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = CONFIG.items.font;
    for (const item of state.items) {
      const emoji = item.type === "coffee"
        ? CONFIG.visual.coffeeEmoji
        : CONFIG.visual.bugEmoji;
      context.fillText(
        emoji,
        item.x + CONFIG.items.size / 2,
        item.y + CONFIG.items.size / 2,
      );
    }
    resetTextAlignment();
  }

  function spawnItem() {
    const maximumX = canvas.width - CONFIG.items.size;
    const type = Math.random() < CONFIG.items.coffeeChance ? "coffee" : "bug";
    state.items.push({ type, x: Math.random() * maximumX, y: 0 });
  }

  function updateItems(deltaTime) {
    const fallSpeed = getFallSpeed();
    state.items = state.items.filter((item) => {
      item.y += fallSpeed * deltaTime;
      if (item.y > canvas.height) {
        return false;
      }
      if (isColliding(item)) {
        applyItemEffect(item);
        return false;
      }
      return true;
    });
  }

  function isColliding(item) {
    return item.x < state.player.x + CONFIG.player.width
      && item.x + CONFIG.items.size > state.player.x
      && item.y < state.player.y + CONFIG.player.height
      && item.y + CONFIG.items.size > state.player.y;
  }

  function applyItemEffect(item) {
    if (item.type === "coffee") {
      state.score += 1;
      return;
    }

    state.lives -= 1;
    if (state.lives <= 0) {
      finishGame();
    }
  }

  function finishGame() {
    state.screen = SCREEN.GAME_OVER;
    state.pressedKeys.clear();
    if (state.score > state.highScore) {
      state.highScore = state.score;
      saveHighScore(state.highScore);
    }
  }

  function drawHud() {
    context.fillStyle = CONFIG.visual.primaryColor;
    context.font = CONFIG.visual.hudFont;
    context.textAlign = "start";
    context.textBaseline = "top";
    context.fillText(
      `${CONFIG.visual.scoreLabel}: ${state.score}`,
      CONFIG.visual.hudPadding,
      CONFIG.visual.hudPadding,
    );
    context.textAlign = "end";
    context.fillText(
      `${CONFIG.visual.livesLabel}: ${state.lives}`,
      canvas.width - CONFIG.visual.hudPadding,
      CONFIG.visual.hudPadding,
    );
    resetTextAlignment();
  }

  function drawGameOver() {
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = CONFIG.visual.primaryColor;
    context.font = CONFIG.visual.titleFont;
    context.fillText(
      CONFIG.visual.gameOverTitle,
      canvas.width / 2,
      canvas.height / 2 + CONFIG.visual.gameOverTitleOffset,
    );
    context.font = CONFIG.visual.gameOverFont;
    context.fillText(
      `${CONFIG.visual.finalScoreLabel}: ${state.score}`,
      canvas.width / 2,
      canvas.height / 2 + CONFIG.visual.finalScoreOffset,
    );
    context.fillText(
      `${CONFIG.visual.highScoreLabel}: ${state.highScore}`,
      canvas.width / 2,
      canvas.height / 2 + CONFIG.visual.highScoreOffset,
    );
    context.fillStyle = CONFIG.visual.accentColor;
    context.font = CONFIG.visual.instructionFont;
    context.fillText(
      CONFIG.visual.gameOverInstruction,
      canvas.width / 2,
      canvas.height / 2 + CONFIG.visual.gameOverInstructionOffset,
    );
    resetTextAlignment();
  }

  function getFallSpeed() {
    return CONFIG.items.initialFallSpeed
      + state.elapsedTime * CONFIG.items.speedIncreasePerSecond;
  }

  function getSpawnInterval() {
    const reducedInterval = CONFIG.items.initialSpawnInterval
      - state.elapsedTime * CONFIG.items.spawnIntervalDecreasePerSecond;
    return Math.max(CONFIG.items.minimumSpawnInterval, reducedInterval);
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