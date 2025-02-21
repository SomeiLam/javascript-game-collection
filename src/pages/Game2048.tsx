import { useState } from 'react'
import GameLayout from '../components/GameLayout'
import StartButton from '../components/StartButton'

function Game2048() {
  const [gameStarted, setGameStarted] = useState(false)
  return (
    <GameLayout title="2048">
      <div className="max-w-4xl mx-auto">
        <div
          className={`bg-gray-800 rounded-lg p-8 ${!gameStarted ? 'border-effect orange-yellow' : ''}`}
        >
          {!gameStarted ? (
            <div className="flex justify-center items-center flex-col">
              <h2 className="text-2xl font-bold mb-4">Coming soon...</h2>
              <p className="text-gray-400">Combine numbers to reach 2048</p>

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

export default Game2048
