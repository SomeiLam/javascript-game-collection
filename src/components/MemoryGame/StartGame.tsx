import React, { useState } from 'react'
import StartButton from '../StartButton'
import { Minus, Plus } from 'lucide-react'

const landmarkCards = [
  'christ-the-redeemer',
  'colosseum',
  'eiffel-tower',
  'golden-gate',
  'great-wall',
  'liberty',
  'machu-picchu',
  'mount-rushmore',
  'mt-fuji',
  'pisa',
  'pyramid',
  'taj-mahal',
]

interface StartGameProps {
  handleStartGame: (counts: number) => void
}

const StartGame: React.FC<StartGameProps> = ({ handleStartGame }) => {
  const [counts, setCounts] = useState<number>(landmarkCards.length)
  return (
    <div className="flex flex-col gap-16 justify-center items-center">
      <div className="flex justify-center items-center flex-col">
        <h2 className="text-2xl font-bold mb-4">Memory Game</h2>
        <p className="text-gray-400 max-w-[600px]">
          Test your memory and explore the world with our vibrant, AI-generated
          landmark cards, featuring a playful anime style that brings iconic
          locations to life!
        </p>
        <div className="pt-10 flex flex-row gap-5 flex-wrap justify-center">
          {[
            'pisa',
            'golden-gate',
            'liberty',
            'eiffel-tower',
            'face-down',
            'mt-fuji',
            'taj-mahal',
            'machu-picchu',
            'colosseum',
          ].map((card) => (
            <img
              src={`cards/${card}.jpeg`}
              alt={card}
              key={card}
              className="w-[70px] sm:w-[200px] rounded-lg shadow-md"
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-5 items-center mb-10">
        <div className="flex flex-row gap-5 items-center w-full justify-center">
          <p className="text-xl">Card pairs</p>
          <Minus
            onClick={() => counts > 2 && setCounts((prev) => prev - 1)}
            className={`${
              counts > 2
                ? 'text-white cursor-pointer hover:text-[#a166ab]'
                : 'text-gray-400'
            }`}
          />
          <p className="text-xl">{counts}</p>
          <Plus
            onClick={() =>
              counts < landmarkCards.length && setCounts((prev) => prev + 1)
            }
            className={`${
              counts < landmarkCards.length
                ? 'text-white cursor-pointer hover:text-[#a166ab]'
                : 'text-gray-400'
            }`}
          />
        </div>
        <StartButton handleStart={() => handleStartGame(counts)} />
      </div>
    </div>
  )
}

export default StartGame
