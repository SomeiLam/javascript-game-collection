import { useState } from 'react'
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
    <div className="flex justify-center items-center flex-col p-4 overflow-auto">
      <h2 className="text-2xl font-bold mb-4">Game 2048</h2>
      <p className="text-gray-400">
        A classic number puzzle game where you slide numbered tiles to combine
        them and reach the 2048 tile
      </p>
      <div className="flex flex-col justify-start gap-5 py-5">
        <p className="text-lg font-semibold">How to Play:</p>
        <ol className="list-decimal list-inside flex flex-col gap-3">
          <li>Swipe or use arrow keys to slide all tiles in one direction.</li>
          <li>
            Matching tiles merge when they collide, doubling in value (e.g., 2 +
            2 = 4).
          </li>
          <li>A new random tile (2 or 4) appears after each move.</li>
          <li>
            Keep merging tiles until you reach 2048—or continue for a higher
            score!
          </li>
          <li>Game over if the board fills up and no moves are possible.</li>
        </ol>
      </div>

      <div className="flex flex-row items-center justify-start gap-2 py-5">
        <p className="text-lg font-semibold">Tip:</p>
        <span>
          Try to keep your highest-numbered tile in one corner for better
          control!
        </span>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 pt-5">
        <p>🟩 6 × 6 – Ultimate challenge 🟩</p>
        <p>🟨 5 × 5 – More space, longer game 🟨</p>
        <p>🔴 4 × 4 (Classic) – Balanced gameplay 🔴</p>
      </div>
      <div className="flex flex-col justify-start gap-5 py-5"></div>
      <SelectDifficulty
        handleSetDifficulty={handleSetDifficulty}
        difficulty={difficulty}
        type="size"
      />
      <StartButton handleStart={() => handleStartGame(difficulty)} />
    </div>
  )
}

export default StartGame
