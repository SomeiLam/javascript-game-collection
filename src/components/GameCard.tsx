import React from 'react'
import { getHighScore } from '../helper'

interface GameCardProps {
  title: string
  description: string
  icon: React.ReactNode
  path: string
  color: string
  effect: string
  onClick?: () => void
}

const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  icon,
  color,
  effect,
  onClick,
}) => {
  return (
    <div
      className={`border-effect ${effect} group h-[300px] relative overflow-hidden rounded-xl bg-gray-800 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
      onClick={onClick}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          <div className="mb-4">{icon}</div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>

        <div className="flex flex-row items-end justify-between">
          <button className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-300">
            Play Now
          </button>
          {title === 'Snake Game' && <p>🎯 {getHighScore('Snake') || 0}</p>}
          {title === '2048' && <p>🎯 {getHighScore('2048') || 0}</p>}
        </div>
      </div>
    </div>
  )
}

export default GameCard
