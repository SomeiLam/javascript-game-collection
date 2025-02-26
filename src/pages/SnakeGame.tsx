import { useEffect, useRef, useState } from 'react'
import GameLayout from '../components/GameLayout'
import StartGame from '../components/SnakeGame/StartGame'
import { Difficulty } from '../type'
import GameBoard from '../components/SnakeGame/GameBoard'
import StartButton from '../components/StartButton'
import { getHighScore, updateHighScore } from '../helper'

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
    return () => window.removeEventListener('resize', handleResize)
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
  // Constants
  const NAVBAR_HEIGHT = 64
  const EXTRA_MARGIN = 20 // Reserved padding/margin
  const EXTRA_HEIGHT_REDUCTION = 40 // Extra reduction to avoid overflow
  const boardContainerHeight =
    screenSize.height - NAVBAR_HEIGHT - EXTRA_MARGIN - EXTRA_HEIGHT_REDUCTION
  const boardContainerWidth = screenSize.width - EXTRA_MARGIN

  // Pick grid sizes as before (40×20, 30×30, 20×20) depending on screen width
  let boardGrid: { cols: number; rows: number; initialSnake: Position[] }
  if (screenSize.width >= 1024) {
    boardGrid = { cols: 40, rows: 20, initialSnake: [{ x: 20, y: 10 }] }
  } else if (screenSize.width >= 768) {
    boardGrid = { cols: 30, rows: 30, initialSnake: [{ x: 15, y: 20 }] }
  } else {
    boardGrid = { cols: 20, rows: 20, initialSnake: [{ x: 10, y: 15 }] }
  }

  const [difficulty, setDifficulty] = useState<Difficulty>('medium')
  const [speed, setSpeed] = useState(200)
  const [gameStarted, setGameStarted] = useState(false)
  const [snake, setSnake] = useState(boardGrid.initialSnake)
  const [food, setFood] = useState(generateFood(boardGrid.initialSnake, []))
  const [score, setScore] = useState(0)
  const [poisonFood, setPoisonFood] = useState<Position[]>([])
  const [nextPoisonSpawn, setNextPoisonSpawn] = useState(30)
  const directionRef = useRef(INITIAL_DIRECTION)
  const highest = getHighScore('Snake')
  const [newRecord, setNewRecord] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  const handleFinishGame = () => {
    if (score > highest) {
      updateHighScore('Snake', score)
      setNewRecord(true)
    }
    setGameOver(true)
  }

  // Keyboard controls
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
    setSnake(boardGrid.initialSnake)
    directionRef.current = { x: 0, y: -1 }
    setFood(generateFood(boardGrid.initialSnake, []))
    setScore(0)
    setPoisonFood([])
    setNewRecord(false)
    setGameOver(false)
  }

  function generateFood(snake: Position[], poisonFood: Position[]) {
    let newFood: Position
    do {
      newFood = {
        x: Math.floor(Math.random() * boardGrid.cols),
        y: Math.floor(Math.random() * boardGrid.rows),
        type: FOOD_TYPES[Math.floor(Math.random() * FOOD_TYPES.length)],
      }
    } while (
      snake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      ) ||
      poisonFood.some((p) => p.x === newFood.x && p.y === newFood.y)
    )
    return newFood
  }

  function generatePoisonFood() {
    const newPoison = {
      x: Math.floor(Math.random() * boardGrid.cols),
      y: Math.floor(Math.random() * boardGrid.rows),
    }
    if (
      !snake.some(
        (segment) => segment.x === newPoison.x && segment.y === newPoison.y
      ) &&
      !poisonFood.some((p) => p.x === newPoison.x && p.y === newPoison.y) &&
      (food.x !== newPoison.x || food.y !== newPoison.y)
    ) {
      setPoisonFood((prev) => [...prev, newPoison])
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
      handleFinishGame()
      return
    }

    newSnake.unshift(head)

    // Check if food is eaten
    if (head.x === food.x && head.y === food.y) {
      setScore((prev) => {
        const newScore = prev + 1
        if (newScore >= nextPoisonSpawn && difficulty !== 'easy') {
          generatePoisonFood()
          setNextPoisonSpawn(newScore + 10)
        }
        return newScore
      })
      setFood(generateFood(snake, poisonFood))
    } else {
      // If not eaten, remove the tail
      newSnake.pop()
    }

    // Check if poison is eaten
    if (poisonFood.some((p) => p.x === head.x && p.y === head.y)) {
      handleFinishGame()
      return
    }

    setSnake(newSnake)
  }

  function checkCollision(head: Position) {
    const hitWall =
      head.x < 0 ||
      head.y < 0 ||
      head.x >= boardGrid.cols ||
      head.y >= boardGrid.rows
    const hitSelf = snake.some(
      (segment) => segment.x === head.x && segment.y === head.y
    )
    return hitWall || hitSelf
  }

  // Touch-swipe for mobile
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

  // Game loop
  useEffect(() => {
    if (gameOver) return
    const gameLoop = setInterval(() => moveSnake(), speed)
    return () => clearInterval(gameLoop)
  }, [snake, gameOver, speed])

  // Difficulty changes => speed & poison spawn
  useEffect(() => {
    if (difficulty === 'easy') setSpeed(200)
    if (difficulty === 'medium') setSpeed(150)
    if (difficulty === 'hard') setSpeed(100)
    setNextPoisonSpawn(difficulty === 'hard' ? 20 : 30)
  }, [difficulty])
  console.log('boardContainerWidth', boardContainerWidth)
  return (
    <GameLayout
      title="Snake Game"
      noScroll={gameStarted}
      gameFinished={newRecord}
    >
      {!gameStarted ? (
        <div className="bg-gray-800 rounded-lg p-4 sm:p-8 border-effect green-emerald max-w-4xl mx-auto">
          <StartGame handleStartGame={handleStartGame} />
        </div>
      ) : (
        <div
          className="w-full flex justify-center items-center"
          style={{ height: boardContainerHeight }}
        >
          <div
            className="h-full bg-gray-800 rounded-lg"
            style={{ width: boardContainerWidth, height: boardContainerHeight }}
          >
            <GameBoard
              boardSize={boardGrid}
              snake={snake}
              food={food}
              poisonFood={poisonFood}
              direction={{
                x: directionRef.current.x,
                y: directionRef.current.y,
              }}
              containerStyle={{
                width: boardContainerWidth,
                height: boardContainerHeight,
              }}
            />
            {gameOver && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-60 bg-gray-500 bg-opacity-25 p-6 rounded-3xl flex flex-col items-center gap-4">
                <h1 className="text-2xl font-bold text-white">
                  {newRecord ? 'New record!' : 'GAME OVER'}
                </h1>
                <StartButton
                  handleStart={() => {
                    setGameStarted(false)
                    setGameOver(false)
                    setNewRecord(false)
                  }}
                  label="Restart"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </GameLayout>
  )
}

export default SnakeGame
