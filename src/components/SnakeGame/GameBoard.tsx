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
}

const GameBoard: React.FC<GameBoardProps> = ({
  boardSize,
  snake,
  food,
  poisonFood,
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${boardSize.cols}, 1fr)`,
        gridTemplateRows: `repeat(${boardSize.rows}, 1fr)`,
      }}
      className={`gap-[1px] bg-gray-800 ${boardSize.width} ${boardSize.height}`}
    >
      {[...Array(boardSize.rows)].map((_, y) =>
        [...Array(boardSize.cols)].map((_, x) => {
          const isSnake = snake.some(
            (segment) => segment.x === x && segment.y === y
          )
          const isFood = food.x === x && food.y === y
          const isPoison = poisonFood.some((p) => p.x === x && p.y === y)

          return (
            <div
              key={`${x}-${y}`}
              className={`w-full h-full ${
                isSnake ? 'bg-green-500' : 'bg-gray-900'
              }`}
            >
              {isFood ? (
                <img src={`fruits/${food.type}.png`} alt="food" />
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
