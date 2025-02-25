// Tile.tsx
import React from 'react'
import './Tile.css'

interface TileProps {
  value: number
  boardSize?: number // e.g. 4, 5, or 6
}

export const Tile: React.FC<TileProps> = ({ value, boardSize }) => {
  // Dynamically adjust the font size based on board size
  let fontSize = '1.5rem'
  if (boardSize === 5) {
    fontSize = '1.3rem'
  } else if (boardSize === 6) {
    fontSize = '1.1rem'
  }

  const tileStyle = getTileStyle(value)
  return (
    <div className={`tile ${tileStyle}`} style={{ fontSize }}>
      {value !== 0 ? value : ''}
    </div>
  )
}

const getTileStyle = (value: number): string => {
  switch (value) {
    case 2:
      return 'tile-2'
    case 4:
      return 'tile-4'
    case 8:
      return 'tile-8'
    case 16:
      return 'tile-16'
    case 32:
      return 'tile-32'
    case 64:
      return 'tile-64'
    case 128:
      return 'tile-128'
    case 256:
      return 'tile-256'
    case 512:
      return 'tile-512'
    case 1024:
      return 'tile-1024'
    case 2048:
      return 'tile-2048'
    default:
      return 'tile-default'
  }
}
