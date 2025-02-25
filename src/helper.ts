// highScoreHelper.ts

/**
 * Retrieves the high score for a specific game from local storage.
 *
 * @param gameKey - A unique key representing the game (e.g., "2048", "Snake", "MemoryGame").
 * @returns The stored high score, or 0 if no score is stored.
 */
export const getHighScore = (gameKey: string): number => {
  const storedScore = localStorage.getItem(`${gameKey}_highScore`)
  return storedScore ? parseInt(storedScore, 10) : 0
}

/**
 * Updates the high score for a specific game in local storage if the new score is higher.
 *
 * @param gameKey - A unique key representing the game.
 * @param newScore - The new score to compare against the stored high score.
 * @returns The updated (or current) high score.
 */
export const updateHighScore = (gameKey: string, newScore: number): number => {
  const currentHighScore = getHighScore(gameKey)
  if (newScore > currentHighScore) {
    localStorage.setItem(`${gameKey}_highScore`, newScore.toString())
    return newScore
  }
  return currentHighScore
}

/**
 * Clears the stored high score for a specific game.
 *
 * @param gameKey - A unique key representing the game.
 */
export const clearHighScore = (gameKey: string): void => {
  localStorage.removeItem(`${gameKey}_highScore`)
}
