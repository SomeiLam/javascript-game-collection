import React from 'react'
import { ICard } from '../../pages/MemoryGame'

interface CardProps {
  card: ICard
  onClick: () => void
}

export const Card: React.FC<CardProps> = ({ card, onClick }) => {
  return (
    <div
      className={`w-[130px] h-[130px] ${card.isMatched ? '' : 'cursor-pointer'} perspective-1000`}
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
        <div className="absolute w-full h-full bg-gradient-card shadow-md flex items-center justify-center rounded-lg backface-hidden">
          <p className="text-white font-bold text-xl">🚀</p>
        </div>
      </div>
    </div>
  )
}
