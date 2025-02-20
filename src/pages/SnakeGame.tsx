import React from 'react'
import GameLayout from '../components/GameLayout'

function SnakeGame() {
  return (
    <GameLayout title="Snake Game">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Snake Game Coming Soon!</h2>
          <p className="text-gray-400">
            Control the snake, eat the food, and try not to hit the walls or
            yourself. How long can you grow?
          </p>
        </div>
      </div>
    </GameLayout>
  )
}

export default SnakeGame
