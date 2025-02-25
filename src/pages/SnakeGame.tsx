import { useEffect, useRef, useState } from 'react'
import GameLayout from '../components/GameLayout'
import StartGame from '../components/SnakeGame/StartGame'
import { Difficulty } from '../type'
import GameBoard from '../components/SnakeGame/GameBoard'
// import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react'
import StartButton from '../components/StartButton'

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return screenSize
}

interface Position {
  x: number
  y: number
  type?: string
}

const INITIAL_DIRECTION = { x: 0, y: -1 } // Moving up

const FOOD_TYPES = ['coconut', 'grapes', 'lemon', 'mango', 'melon', 'orange']

function SnakeGame() {
  const screenSize = useScreenSize()
  const boardSize =
    screenSize.width >= 1024
      ? {
          cols: 40,
          rows: 20,
          width: 'w-[800px]',
          height: 'h-[400px]',
          initialSnake: [{ x: 20, y: 10 }],
        }
      : screenSize.width >= 768
        ? {
            cols: 30,
            rows: 30,
            width: 'w-[600px]',
            height: 'h-[600px]',
            initialSnake: [{ x: 15, y: 20 }],
          }
        : {
            cols: 20,
            rows: 20,
            width: 'w-[300px]',
            height: 'h-[300px]',
            initialSnake: [{ x: 10, y: 15 }],
          }
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')
  const [speed, setSpeed] = useState(200)
  const [gameStarted, setGameStarted] = useState(false)
  const [snake, setSnake] = useState(boardSize.initialSnake)
  const [food, setFood] = useState(generateFood(snake, []))
  const [score, setScore] = useState(0) // Tracks food eaten
  const [poisonFood, setPoisonFood] = useState<Position[]>([]) // Stores poison food positions
  const [nextPoisonSpawn, setNextPoisonSpawn] = useState(30) // Next score threshold for poison
  const directionRef = useRef(INITIAL_DIRECTION)

  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          if (directionRef.current.y !== 1)
            directionRef.current = { x: 0, y: -1 }
          break
        case 'ArrowDown':
          if (directionRef.current.y !== -1)
            directionRef.current = { x: 0, y: 1 }
          break
        case 'ArrowLeft':
          if (directionRef.current.x !== 1)
            directionRef.current = { x: -1, y: 0 }
          break
        case 'ArrowRight':
          if (directionRef.current.x !== -1)
            directionRef.current = { x: 1, y: 0 }
          break
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const handleStartGame = (difficulty: Difficulty) => {
    setDifficulty(difficulty)
    setGameStarted(true)
    setSnake(boardSize.initialSnake)
    directionRef.current = { x: 0, y: -1 }
    setFood(generateFood(snake, []))
    setGameOver(false)
    setScore(0)
    setPoisonFood([])
  }

  function generateFood(snake: Position[], poisonFood: Position[]) {
    let newFood: Position

    do {
      newFood = {
        x: Math.floor(Math.random() * boardSize.cols),
        y: Math.floor(Math.random() * boardSize.rows),
        type: FOOD_TYPES[Math.floor(Math.random() * FOOD_TYPES.length)],
      }
    } while (
      snake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      ) || // Avoid snake
      poisonFood.some((p) => p.x === newFood.x && p.y === newFood.y) // Avoid poison
    )

    return newFood
  }

  function generatePoisonFood() {
    const newPoison = {
      x: Math.floor(Math.random() * boardSize.cols),
      y: Math.floor(Math.random() * boardSize.rows),
    }

    // Prevent spawning poison on snake or existing food
    if (
      !snake.some(
        (segment) => segment.x === newPoison.x && segment.y === newPoison.y
      ) &&
      !poisonFood.some((p) => p.x === newPoison.x && p.y === newPoison.y) && // Prevent duplicate poisons
      (food.x !== newPoison.x || food.y !== newPoison.y)
    ) {
      setPoisonFood((prev) => [...prev, newPoison]) // Accumulate poison food
    } else {
      generatePoisonFood()
    }
  }

  const moveSnake = () => {
    const newSnake = [...snake]
    const head = {
      x: newSnake[0].x + directionRef.current.x,
      y: newSnake[0].y + directionRef.current.y,
    }

    if (checkCollision(head)) {
      setGameOver(true)
      return
    }

    newSnake.unshift(head)

    // Check if food is eaten
    if (head.x === food.x && head.y === food.y) {
      setScore((prev) => {
        const newScore = prev + 1

        // Check if poison should be generated
        if (score >= nextPoisonSpawn && difficulty !== 'easy') {
          generatePoisonFood() // Add another poison food
          setNextPoisonSpawn(score + 10) // Schedule next poison generation
        }

        return newScore
      })

      setFood(generateFood(snake, poisonFood)) // Generate new food
    } else {
      newSnake.pop()
    }

    // Check if poison food is eaten (Game Over)
    if (poisonFood.some((p) => p.x === head.x && p.y === head.y)) {
      setGameOver(true)
      return
    }

    setSnake(newSnake)
  }

  function checkCollision(head: Position) {
    const hitWall =
      head.x < 0 ||
      head.y < 0 ||
      head.x >= boardSize.cols ||
      head.y >= boardSize.rows
    const hitSelf = snake.some(
      (segment) => segment.x === head.x && segment.y === head.y
    )

    if (hitWall || hitSelf) return true

    return false
  }

  useEffect(() => {
    let startX = 0,
      startY = 0

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX
      const endY = e.changedTouches[0].clientY
      const diffX = endX - startX
      const diffY = endY - startY

      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0 && directionRef.current.x !== -1)
          directionRef.current = { x: 1, y: 0 }
        else if (diffX < 0 && directionRef.current.x !== 1)
          directionRef.current = { x: -1, y: 0 }
      } else {
        if (diffY > 0 && directionRef.current.y !== -1)
          directionRef.current = { x: 0, y: 1 }
        else if (diffY < 0 && directionRef.current.y !== 1)
          directionRef.current = { x: 0, y: -1 }
      }
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  useEffect(() => {
    if (gameOver) return

    const gameLoop = setInterval(() => moveSnake(), speed)

    return () => clearInterval(gameLoop)
  }, [snake, gameOver, speed])

  useEffect(() => {
    if (difficulty === 'easy') setSpeed(200) // Normal speed
    if (difficulty === 'medium') setSpeed(150) // Faster
    if (difficulty === 'hard') setSpeed(100) // Even faster
    setNextPoisonSpawn(difficulty === 'hard' ? 20 : 30)
  }, [difficulty])

  return (
    <GameLayout title="Snake Game" noScroll={gameStarted}>
      <div className="max-w-4xl mx-auto">
        <div
          className={`bg-gray-800 rounded-lg py-4 sm:p-8 ${!gameStarted ? 'border-effect green-emerald' : ''}`}
        >
          {!gameStarted ? (
            <StartGame handleStartGame={handleStartGame} />
          ) : (
            <div className="flex flex-col items-center gap-5">
              <div className="flex flex-row items-center gap-5">
                <h5 className="text-lg flex flex-row gap-1 items-center">
                  <img
                    src="/fruits/orange.png"
                    alt="score"
                    className="w-5 h-5"
                  />
                  {score}
                </h5>
              </div>

              <div className={`${gameOver ? 'relative' : ''}`}>
                <GameBoard
                  boardSize={boardSize}
                  snake={snake}
                  food={food}
                  poisonFood={poisonFood}
                  direction={{
                    x: directionRef.current.x,
                    y: directionRef.current.y,
                  }}
                />
                {gameOver && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-75 gap-4">
                    <h1 className="text-4xl font-bold text-white">GAME OVER</h1>
                    <StartButton
                      handleStart={() => {
                        setGameStarted(false)
                        setGameOver(false)
                      }}
                      label="Restart"
                    />
                  </div>
                )}
              </div>
              {/* Direction Buttons */}
              {/* <div className="flex flex-col sm:hidden items-center gap-2">
                <button
                  onClick={() => (directionRef.current = { x: 0, y: -1 })}
                  className="w-16 h-16 bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-150 hover:shadow-indigo-500/25"
                >
                  <ArrowUp className="w-8 h-8" />
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => (directionRef.current = { x: -1, y: 0 })}
                    className="w-16 h-16 bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-150 hover:shadow-indigo-500/25"
                  >
                    <ArrowLeft className="w-8 h-8" />
                  </button>
                  <button
                    onClick={() => (directionRef.current = { x: 0, y: 1 })}
                    className="w-16 h-16 bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-150 hover:shadow-indigo-500/25"
                  >
                    <ArrowDown className="w-8 h-8" />
                  </button>
                  <button
                    onClick={() => (directionRef.current = { x: 1, y: 0 })}
                    className="w-16 h-16 bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-150 hover:shadow-indigo-500/25"
                  >
                    <ArrowRight className="w-8 h-8" />
                  </button>
                </div>
              </div> */}
            </div>
          )}
        </div>
      </div>
    </GameLayout>
  )
}

export default SnakeGame
