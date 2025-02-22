import React, { useState } from 'react'
import StartButton from '../StartButton'
import { Difficulty } from '../../type'
import SelectDifficulty from '../SelectDifficulty'

interface StartGameProps {
  handleStartGame: (difficulty: Difficulty) => void
}

const StartGame: React.FC<StartGameProps> = ({ handleStartGame }) => {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')

  const handleSetDifficulty = (level: Difficulty) => setDifficulty(level)

  return (
    <div className="flex justify-center items-center flex-col">
      <h2 className="text-2xl font-bold mb-4">Sudoku</h2>
      <p className="text-gray-400">
        Get ready to tease your brain and crack the code! Whether you're a
        Sudoku master or just starting, dive in, have fun, and let the numbers
        dance!
      </p>
      <div className="flex flex-col justify-start gap-5 py-5">
        <p className="text-lg font-semibold">How to Play:</p>
        <ol className="list-decimal list-inside flex flex-col gap-3">
          <li>
            Fill the 9×9 grid so that each row, each column, and each 3×3 box
            contains the numbers 1 to 9, without repeating any.
          </li>
          <li>Some numbers are already placed—use them as clues!</li>
          <li>No duplicates allowed in any row, column, or box.</li>
          <li>Use logic (not guessing!) to figure out the missing numbers.</li>
          <li>Complete the puzzle and become a Sudoku master! 🎉</li>
        </ol>
      </div>
      <SelectDifficulty
        handleSetDifficulty={handleSetDifficulty}
        difficulty={difficulty}
      />
      <StartButton handleStart={() => handleStartGame(difficulty)} />
    </div>
  )
}

export default StartGame
