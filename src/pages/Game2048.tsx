import { useState } from 'react'
import GameLayout from '../components/GameLayout'
import StartButton from '../components/StartButton'

function Game2048() {
  const [gameStarted, setGameStarted] = useState(false)
  return (
    <GameLayout title="Sudoku">
      <div className="max-w-4xl mx-auto">
        <div
          className={`bg-gray-800 rounded-lg p-8 ${!gameStarted ? 'border-effect orange-yellow' : ''}`}
        >
          {!gameStarted ? (
            <div className="flex justify-center items-center flex-col">
              <h2 className="text-2xl font-bold mb-4">Game 2048</h2>
              <p className="text-gray-400">
                Get ready to tease your brain and crack the code! Whether you're
                a Sudoku master or just starting, dive in, have fun, and let the
                numbers dance!
              </p>
              <div className="flex flex-col justify-start gap-5 py-5">
                <p className="text-lg font-semibold">How to Play:</p>
                <ol className="list-decimal list-inside flex flex-col gap-3">
                  <li>
                    Fill the 9×9 grid so that each row, each column, and each
                    3×3 box contains the numbers 1 to 9, without repeating any.
                  </li>
                  <li>Some numbers are already placed—use them as clues!</li>
                  <li>No duplicates allowed in any row, column, or box.</li>
                  <li>
                    Use logic (not guessing!) to figure out the missing numbers.
                  </li>
                  <li>Complete the puzzle and become a Sudoku master! 🎉</li>
                </ol>
              </div>
              <StartButton handleStart={() => setGameStarted(true)} />
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
