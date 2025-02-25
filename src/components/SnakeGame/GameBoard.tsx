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
        position: 'relative',
      }}
      className={`relative bg-gray-900 ${boardSize.width} ${boardSize.height}`}
    >
      {/* Snake Body */}
      {snake.map((segment, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: `${(segment.y / boardSize.rows) * 100}%`,
            left: `${(segment.x / boardSize.cols) * 100}%`,
            width: `${100 / boardSize.cols}%`,
            height: `${100 / boardSize.rows}%`,
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
            <div className="w-full h-full bg-[#76a32e] rounded-lg"></div>
          )}
        </div>
      ))}

      {/* Food */}
      <div
        style={{
          position: 'absolute',
          top: `${(food.y / boardSize.rows) * 100}%`,
          left: `${(food.x / boardSize.cols) * 100}%`,
          width: `${100 / boardSize.cols}%`,
          height: `${100 / boardSize.rows}%`,
        }}
      >
        <img
          src={`fruits/${food.type}.png`}
          alt="food"
          key={`${food.x}-${food.y}-${food.type}`}
          className="scale-125 fade-grow w-full h-full"
        />
      </div>

      {/* Poison Food */}
      {poisonFood.map((p, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: `${(p.y / boardSize.rows) * 100}%`,
            left: `${(p.x / boardSize.cols) * 100}%`,
            width: `${100 / boardSize.cols}%`,
            height: `${100 / boardSize.rows}%`,
            transition: 'top 100ms linear, left 100ms linear',
          }}
        >
          <img src="fruits/poison.png" alt="poison-food" />
        </div>
      ))}
    </div>
  )
}

export default GameBoard
