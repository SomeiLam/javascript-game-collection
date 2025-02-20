import React from 'react'
import GameLayout from '../components/GameLayout'

function RockPaperScissors() {
  return (
    <GameLayout title="Rock Paper Scissors">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">
            Rock Paper Scissors Coming Soon!
          </h2>
          <p className="text-gray-400">
            The classic game of Rock Paper Scissors against the computer. Test
            your luck and strategy!
          </p>
        </div>
      </div>
    </GameLayout>
  )
}

export default RockPaperScissors
