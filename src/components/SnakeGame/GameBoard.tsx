interface Position {
  x: number
  y: number
  type?: string
}

interface GameBoardProps {
  boardSize: { cols: number; rows: number; width: string; height: string }
  snake: Position[]
  food: Position
  poisonFood: Position[]
  direction: Position
}

const GameBoard: React.FC<GameBoardProps> = ({
  boardSize,
  snake,
  food,
  poisonFood,
  direction,
}) => {
  // Get the snake head
  const snakeHead = snake[0]

  // Determine rotation based on direction
  const getRotation = () => {
    if (direction.x === 1) return '-rotate-90' // Right
    if (direction.x === -1) return 'rotate-90' // Left
    if (direction.y === -1) return 'rotate-180' // Down
    return '' // Default (Up)
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${boardSize.cols}, 1fr)`,
        gridTemplateRows: `repeat(${boardSize.rows}, 1fr)`,
      }}
      className={`gap-[1px] bg-gray-900 ${boardSize.width} ${boardSize.height}`}
    >
      {[...Array(boardSize.rows)].map((_, y) =>
        [...Array(boardSize.cols)].map((_, x) => {
          const isSnake = snake.some(
            (segment) => segment.x === x && segment.y === y
          )
          const isSnakeHead = snakeHead.x === x && snakeHead.y === y
          const isFood = food.x === x && food.y === y
          const isPoison = poisonFood.some((p) => p.x === x && p.y === y)

          return (
            <div
              key={`${x}-${y}`}
              className={`w-full h-full ${
                isSnakeHead
                  ? 'scale-150'
                  : isSnake
                    ? 'bg-[#76a32e] rounded-full scale-125 z-0'
                    : 'bg-gray-900'
              }`}
            >
              {isSnakeHead ? (
                <img
                  src="snake/head.png"
                  alt="snake-head"
                  className={`w-full h-full object-contain z-10 relative ${getRotation()}`}
                />
              ) : isFood ? (
                <img
                  src={`fruits/${food.type}.png`}
                  alt="food"
                  className="!scale-150"
                />
              ) : isPoison ? (
                <img src="fruits/poison.png" alt="poison-food" />
              ) : null}
            </div>
          )
        })
      )}
    </div>
  )
}

export default GameBoard
