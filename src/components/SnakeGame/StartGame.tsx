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
    <div className="flex justify-center items-center flex-col">
      <h2 className="text-2xl font-bold mb-4">Snake Game</h2>
      <p className="text-gray-400">
        Guide the snake to eat food and grow longer 🐍
      </p>
      <div className="flex flex-col justify-start gap-5 py-5"></div>
      <SelectDifficulty
        handleSetDifficulty={handleSetDifficulty}
        difficulty={difficulty}
      />
      <StartButton handleStart={() => handleStartGame(difficulty)} />
    </div>
  )
}

export default StartGame
