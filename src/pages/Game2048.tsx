import React from 'react'
import GameLayout from '../components/GameLayout'

function Game2048() {
  return (
    <GameLayout title="2048">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">2048 Coming Soon!</h2>
          <p className="text-gray-400">
            Combine the numbers to reach 2048! Use your arrow keys to slide the
            tiles. Plan your moves carefully to achieve the highest score.
          </p>
        </div>
      </div>
    </GameLayout>
  )
}

export default Game2048
