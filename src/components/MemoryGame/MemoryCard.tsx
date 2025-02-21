import React from 'react'
import { ICard } from '../../pages/MemoryGame'

interface CardProps {
  card: ICard
  onClick: () => void
  length: number
}

export const Card: React.FC<CardProps> = ({ card, onClick, length }) => {
  const width =
    length < 3
      ? 'md:w-[280px]'
      : length < 4
        ? 'md:w-[250px]'
        : length < 9
          ? 'md:w-[180px]'
          : 'md:w-[150px]'
  const height =
    length < 3
      ? 'md:h-[280px]'
      : length < 4
        ? 'md:h-[250px]'
        : length < 9
          ? 'md:h-[180px]'
          : 'md:h-[150px]'

  return (
    <div
      className={`w-[100px] h-[100px] ${width} ${height} ${card.isMatched ? '' : 'cursor-pointer'} perspective-1000`}
      onClick={!card.isMatched ? onClick : undefined} // Disable click on matched cards
    >
      {/* Flip Container (Controls flipping) */}
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Side - Animal Image */}
        <div className="absolute w-full h-full bg-white shadow-md flex items-center justify-center rounded-lg backface-hidden transform rotate-y-180">
          <img
            src={card.src}
            alt="card"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Back Side - Green Card with '?' */}
        <div className="absolute w-full h-full shadow-md flex items-center justify-center rounded-lg backface-hidden">
          <img
            src="/cards/face-down.jpeg"
            alt="face-down"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}
