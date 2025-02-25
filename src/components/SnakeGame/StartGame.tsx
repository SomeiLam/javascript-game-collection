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
      <h2 className="text-2xl font-bold mb-4">Snake Game</h2>
      <p className="text-gray-400">
        Guide the snake to eat food and grow longer 🐍
      </p>
      <div className="flex flex-col justify-start gap-5 py-5">
        <p className="text-lg font-semibold">How to Play:</p>
        <ul className="list-disc list-inside flex flex-col gap-3">
          <li>
            Move the Snake:
            <p className="pl-3">Desktop: Use Arrow Keys (⬆️⬇️⬅️➡️)</p>
            <p className="pl-3">Mobile: Swipe or tap on-screen buttons.</p>
          </li>
          <li>Eat the Food 🍎: Increases the snake's length and score.</li>
          <li>Avoid Poison ☠️: Poison food appears after a certain score.</li>
          <li>
            Game Over: If the snake hits the wall, itself, or eats poison.
          </li>
        </ul>
      </div>
      <div className="flex flex-col justify-start gap-5 py-5"></div>
      <SelectDifficulty
        handleSetDifficulty={handleSetDifficulty}
        difficulty={difficulty}
        type="speed"
      />
      <StartButton handleStart={() => handleStartGame(difficulty)} />
    </div>
  )
}

export default StartGame
