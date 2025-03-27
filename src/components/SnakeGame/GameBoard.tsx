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
  const cellSize = Math.min(
    containerStyle.width / boardSize.cols,
    containerStyle.height / boardSize.rows
  )

  const boardPixelWidth = cellSize * boardSize.cols
  const boardPixelHeight = cellSize * boardSize.rows

  const boardStyle: CSSProperties = {
    position: 'relative',
    width: boardPixelWidth,
    height: boardPixelHeight,
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
        const topPx = segment.y * cellSize
        const leftPx = segment.x * cellSize

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: topPx,
              left: leftPx,
              width: cellSize,
              height: cellSize,
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
          top: food.y * cellSize,
          left: food.x * cellSize,
          width: cellSize,
          height: cellSize,
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
            top: p.y * cellSize,
            left: p.x * cellSize,
            width: cellSize,
            height: cellSize,
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
