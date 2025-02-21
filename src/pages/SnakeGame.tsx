import { useState } from 'react'
import GameLayout from '../components/GameLayout'
import StartButton from '../components/StartButton'

function SnakeGame() {
  const [gameStarted, setGameStarted] = useState(false)
  return (
    <GameLayout title="Snake Game">
      <div className="max-w-4xl mx-auto">
        <div
          className={`bg-gray-800 rounded-lg p-8 ${!gameStarted ? 'border-effect green-emerald' : ''}`}
        >
          {!gameStarted ? (
            <div className="flex justify-center items-center flex-col">
              <h2 className="text-2xl font-bold mb-4">Coming soon...</h2>
              <p className="text-gray-400">
                Guide the snake to eat food and grow longer
              </p>
              <div className="flex flex-col justify-start gap-5 py-5"></div>
              <StartButton handleStart={() => setGameStarted(true)} disabled />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </GameLayout>
  )
}

export default SnakeGame
