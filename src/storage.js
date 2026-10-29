import { CONFIG } from "./config.js";

export function loadHighScore() {
  const savedScore = Number(localStorage.getItem(CONFIG.storage.highScoreKey));
  return Number.isFinite(savedScore) && savedScore >= 0 ? savedScore : 0;
}

export function saveHighScore(score) {
  localStorage.setItem(CONFIG.storage.highScoreKey, String(score));
}