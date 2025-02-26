// GameBoard.tsx (Reverted to fill the container in both dimensions)
import { memo, CSSProperties } from 'react'

interface Position {
  x: number
  y: number
  type?: string
}

interface BoardSize {
  cols: number
  rows: number
  initialSnake?: Position[]
}

interface GameBoardProps {
  boardSize: BoardSize
  snake: Position[]
  food: Position
  poisonFood: Position[]
  direction: Position
  // containerStyle from SnakeGame
  containerStyle: { width: number; height: number }
}

const GameBoard: React.FC<GameBoardProps> = ({
  boardSize,
  snake,
  food,
  poisonFood,
  direction,
  containerStyle,
}) => {
  // Remove the "square cell" logic; fill entire container
  const colWidth = containerStyle.width / boardSize.cols
  const rowHeight = containerStyle.height / boardSize.rows

  const boardStyle: CSSProperties = {
    position: 'relative',
    width: containerStyle.width,
    height: containerStyle.height,
    overflow: 'hidden',
  }

  const getRotation = () => {
    if (direction.x === 1) return '-rotate-90' // Right
    if (direction.x === -1) return 'rotate-90' // Left
    if (direction.y === -1) return 'rotate-180' // Up
    return '' // Down
  }

  return (
    <div
      style={boardStyle}
      className="relative bg-gray-900 border-4 border-yellow-500"
    >
      {/* Snake segments */}
      {snake.map((segment, index) => {
        const topPx = segment.y * rowHeight
        const leftPx = segment.x * colWidth

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: topPx,
              left: leftPx,
              width: colWidth,
              height: rowHeight,
              transition: 'top 100ms linear, left 100ms linear',
            }}
            className={index === 0 ? 'z-10' : 'z-0'}
          >
            {index === 0 ? (
              <img
                src="snake/head.png"
                alt="snake-head"
                className={`w-full h-full object-contain scale-150 ${getRotation()}`}
              />
            ) : (
              <div className="w-full h-full bg-[#76a32e] rounded-xl" />
            )}
          </div>
        )
      })}

      {/* Food */}
      <div
        style={{
          position: 'absolute',
          top: food.y * rowHeight,
          left: food.x * colWidth,
          width: colWidth,
          height: rowHeight,
        }}
      >
        <img
          src={`fruits/${food.type}.png`}
          alt="food"
          className="scale-125 w-full h-full object-contain"
        />
      </div>

      {/* Poison Food */}
      {poisonFood.map((p, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: p.y * rowHeight,
            left: p.x * colWidth,
            width: colWidth,
            height: rowHeight,
            transition: 'top 100ms linear, left 100ms linear',
          }}
        >
          <img
            src="fruits/poison.png"
            alt="poison-food"
            className="w-full h-full object-contain"
          />
        </div>
      ))}
    </div>
  )
}

export default memo(GameBoard)
