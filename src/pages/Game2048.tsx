import { useState } from 'react'
import GameLayout from '../components/GameLayout'
import { Difficulty } from '../type'
import StartGame from '../components/2048/StartGame'
import GameBoard from '../components/2048/GameBoard'

const Game2048 = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [gameStarted, setGameStarted] = useState(false)
  const [gameHighScore, setGameHighScore] = useState(false)

  const handleStartGame = (difficulty: Difficulty) => {
    setDifficulty(difficulty)
    setGameStarted(true)
  }

  return (
    <GameLayout
      title="Game 2048"
      noScroll={gameStarted}
      gameFinished={gameHighScore}
    >
      <div className="max-w-4xl mx-auto">
        <div
          className={`bg-gray-800 rounded-lg p-8 ${!gameStarted ? 'border-effect orange-yellow' : ''}`}
        >
          {!gameStarted ? (
            <StartGame handleStartGame={handleStartGame} />
          ) : (
            <GameBoard
              size={difficulty === 'easy' ? 5 : 4}
              restartGame={() => {
                setGameHighScore(false)
                setGameStarted(false)
              }}
              setGameHighScore={setGameHighScore}
            />
          )}
        </div>
      </div>
    </GameLayout>
  )
}

export default Game2048
