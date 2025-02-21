import { Baby, Brain, Skull } from 'lucide-react'
import React, { useState } from 'react'
import { Difficulty } from '../../pages/Sudoku'
import StartButton from '../StartButton'

interface StartGameProps {
  handleStartGame: (difficulty: Difficulty) => void
}

const StartGame: React.FC<StartGameProps> = ({ handleStartGame }) => {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')

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
      <div className="grid grid-cols-3 gap-4 my-5">
        <button
          onClick={() => setDifficulty('easy')}
          className={`group relative bg-gradient-to-br from-green-400 to-green-600 ${difficulty === 'easy' ? 'shadow-[0_0_40px_rgba(34,197,94,0.7)] cursor-default' : ' hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] active:scale-[0.98]'} p-[2px] rounded-xl overflow-hidden transition-all`}
        >
          <div
            className={`${difficulty === 'easy' ? 'bg-green-800' : 'bg-gray-800 group-hover:bg-gray-800/95'} rounded-[10px] p-3 flex flex-col items-center gap-2 `}
          >
            <Baby className="w-6 h-6 text-green-400" />
            <span className="font-semibold text-green-400">Easy</span>
          </div>
        </button>
        <button
          onClick={() => setDifficulty('medium')}
          className={`group relative bg-gradient-to-br from-yellow-400 to-yellow-600 ${difficulty === 'medium' ? 'shadow-[0_0_20px_rgba(234,179,8,0.7)] cursor-default' : 'hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] active:scale-[0.98]'} p-[2px] rounded-xl overflow-hidden transition-all `}
        >
          <div
            className={`${difficulty === 'medium' ? 'bg-yellow-800' : 'bg-gray-800 group-hover:bg-gray-800/95'} rounded-[10px] p-3 flex flex-col items-center gap-2`}
          >
            <Brain className="w-6 h-6 text-yellow-400" />
            <span className="font-semibold text-yellow-400">Medium</span>
          </div>
        </button>
        <button
          onClick={() => setDifficulty('hard')}
          className={`group relative bg-gradient-to-br from-red-400 to-red-600 p-[2px] ${difficulty === 'hard' ? 'shadow-[0_0_20px_rgba(239,68,68,0.7)] cursor-default' : ' hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] active:scale-[0.98]'} rounded-xl overflow-hidden transition-all`}
        >
          <div
            className={`${difficulty === 'hard' ? 'bg-red-800' : 'bg-gray-800 group-hover:bg-gray-800/95'} rounded-[10px] p-3 flex flex-col items-center gap-2`}
          >
            <Skull className="w-6 h-6 text-red-400" />
            <span className="font-semibold text-red-400">Hard</span>
          </div>
        </button>
      </div>
      <StartButton handleStart={() => handleStartGame(difficulty)} />
    </div>
  )
}

export default StartGame
