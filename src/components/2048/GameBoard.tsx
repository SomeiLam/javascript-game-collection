import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Tile } from './Tile'
import { RotateCcw, Undo } from 'lucide-react'
import StartButton from '../StartButton'
import { updateHighScore } from '../../helper'

interface MoveResult {
  board: number[][]
  score: number
  moved: boolean
}
interface GameBoardProps {
  size: 4 | 5 | 6
  restartGame: () => void
  setGameHighScore: (isHighest: boolean) => void
}

interface TouchPosition {
  x: number
  y: number
}

const GameBoard: React.FC<GameBoardProps> = ({
  size,
  restartGame,
  setGameHighScore,
}) => {
  const [board, setBoard] = useState<number[][]>(createEmptyBoard(size))
  const [score, setScore] = useState(0)
  const [prevBoard, setPrevBoard] = useState<number[][] | null>(null)
  const [prevScore, setPrevScore] = useState<number | null>(null)
  const [touchStart, setTouchStart] = useState<TouchPosition | null>(null)
  const [gameOver, setGameOver] = useState(false)

  // Use a ref to always have the latest board in the keydown handler
  const boardRef = useRef(board)
  useEffect(() => {
    boardRef.current = board
  }, [board])

  // Initialize board once (or whenever the board size changes)
  useEffect(() => {
    const newBoard = createEmptyBoard(size)
    addRandomTile(newBoard)
    addRandomTile(newBoard)
    setBoard(newBoard)
  }, [size])

  // Helper: Handle game over logic
  const handleGameOver = useCallback(
    (finalScore: number) => {
      const isHighest = updateHighScore('2048', finalScore) === finalScore
      if (isHighest) setGameHighScore(true)

      setGameOver(true)
    },
    [setGameHighScore]
  )
  console.log('render')
  // Keydown listener – note we add it only once and use boardRef for current state
  useEffect(() => {
    setGameOver(false)
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentBoard = boardRef.current
      let moveResult: MoveResult | undefined
      switch (e.key) {
        case 'ArrowUp':
          moveResult = moveUp(currentBoard)
          break
        case 'ArrowDown':
          moveResult = moveDown(currentBoard)
          break
        case 'ArrowLeft':
          moveResult = moveLeft(currentBoard)
          break
        case 'ArrowRight':
          moveResult = moveRight(currentBoard)
          break
        default:
          return
      }
      if (moveResult && moveResult.moved) {
        // Save current state before applying the move so we can undo later
        setPrevBoard(currentBoard.map((row) => [...row]))
        setPrevScore(score)
        // Update board and score
        addRandomTile(moveResult.board)
        const finalScore = score + moveResult.score
        setBoard(moveResult.board)
        setScore(finalScore)
        if (checkGameOver(moveResult.board)) {
          handleGameOver(finalScore)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleGameOver, score])

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    setTouchStart({ x: touch.clientX, y: touch.clientY })
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return

    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStart.x
    const deltaY = touch.clientY - touchStart.y
    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)
    const threshold = 50 // Minimum distance in pixels for a valid swipe

    let moveResult: MoveResult | undefined
    if (Math.max(absX, absY) > threshold) {
      if (absX > absY) {
        // Horizontal swipe
        if (deltaX > 0) {
          moveResult = moveRight(boardRef.current)
        } else {
          moveResult = moveLeft(boardRef.current)
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          moveResult = moveDown(boardRef.current)
        } else {
          moveResult = moveUp(boardRef.current)
        }
      }
      if (moveResult && moveResult.moved) {
        // Save state for undo before applying move
        setPrevBoard(boardRef.current.map((row) => [...row]))
        setPrevScore(score)
        addRandomTile(moveResult.board)
        const finalScore = score + moveResult.score
        setBoard(moveResult.board)
        setScore(finalScore)
        if (checkGameOver(moveResult.board)) {
          handleGameOver(finalScore)
        }
      }
    }
    setTouchStart(null)
  }

  // Undo function: restores the previous state and then clears it
  const handleUndo = () => {
    if (!prevBoard) return
    setBoard(prevBoard)
    setScore(prevScore || 0)
    // Clear previous state so undo can only be used once per move
    setPrevBoard(null)
    setPrevScore(null)
  }

  return (
    <div
      className="flex flex-col gap-2 w-full justify-center items-center fireworks"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {gameOver ? (
        <div className="text-center mb-5">
          <h2 className="text-2xl font-bold text-[#d652ed]">
            You have no moves. Your score is {score}
          </h2>
          <StartButton handleStart={restartGame} label="Play Again" />
        </div>
      ) : (
        <div className="flex w-full justify-between sm:gap-16 sm:justify-center items-center mb-5">
          <button
            onClick={handleUndo}
            disabled={!prevBoard}
            className={`flex items-center gap-2 p-2 ${!prevBoard ? 'bg-gray-700 text-gray-600' : 'bg-blue-500 hover:bg-blue-600 transition-colors'}  text-white rounded-lg`}
          >
            <Undo className="w-5 h-5" />
          </button>
          <div className="text-lg sm:text-2xl font-bold text-center text-white">
            Score: {score}
          </div>

          <button
            onClick={restartGame}
            className="flex items-center gap-2 p-2 bg-yellow-500 text-white rounded-lg hover:bg-orange-400 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      )}
      <div
        className="grid gap-2"
        style={{
          width: 'min(100%, 65vh)',
          aspectRatio: '1 / 1',
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          gridTemplateRows: `repeat(${size}, 1fr)`,
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              value={value}
              boardSize={size}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default GameBoard

// Create an empty board of given size
const createEmptyBoard = (size: number): number[][] =>
  Array.from({ length: size }, () => Array(size).fill(0))

// Add a random tile (2 or 4) to an empty cell on the board
const addRandomTile = (board: number[][]) => {
  const emptyCells: { r: number; c: number }[] = []
  board.forEach((row, r) => {
    row.forEach((value, c) => {
      if (value === 0) emptyCells.push({ r, c })
    })
  })
  if (emptyCells.length === 0) return
  const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)]
  board[r][c] = Math.random() < 0.9 ? 2 : 4
}

// Helper function: merge a single row to the left
const mergeRow = (row: number[]): { newRow: number[]; score: number } => {
  const nonZero = row.filter((val) => val !== 0)
  const mergedRow: number[] = []
  let score = 0
  let skip = false
  for (let i = 0; i < nonZero.length; i++) {
    if (skip) {
      skip = false
      continue
    }
    if (i < nonZero.length - 1 && nonZero[i] === nonZero[i + 1]) {
      const mergedValue = nonZero[i] * 2
      mergedRow.push(mergedValue)
      score += mergedValue
      skip = true
    } else {
      mergedRow.push(nonZero[i])
    }
  }
  while (mergedRow.length < row.length) {
    mergedRow.push(0)
  }
  return { newRow: mergedRow, score }
}

const arraysEqual = (a: number[], b: number[]): boolean =>
  a.length === b.length && a.every((val, index) => val === b[index])

// Move left – merge every row leftwards
const moveLeft = (board: number[][]): MoveResult => {
  let moved = false
  let totalScore = 0
  const newBoard = board.map((row) => {
    const { newRow, score } = mergeRow(row)
    if (!arraysEqual(row, newRow)) {
      moved = true
    }
    totalScore += score
    return newRow
  })
  return { board: newBoard, score: totalScore, moved }
}

// Move right – reverse each row, merge, then reverse back
const moveRight = (board: number[][]): MoveResult => {
  let moved = false
  let totalScore = 0
  const newBoard = board.map((row) => {
    const reversed = [...row].reverse()
    const { newRow, score } = mergeRow(reversed)
    const finalRow = newRow.reverse()
    if (!arraysEqual(row, finalRow)) {
      moved = true
    }
    totalScore += score
    return finalRow
  })
  return { board: newBoard, score: totalScore, moved }
}

// Transpose a matrix (swap rows and columns)
const transpose = (matrix: number[][]): number[][] =>
  matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]))

// Move up – transpose, merge left, then transpose back
const moveUp = (board: number[][]): MoveResult => {
  const transposed = transpose(board)
  const moveResult = moveLeft(transposed)
  const newBoard = transpose(moveResult.board)
  // Check if anything moved by comparing original and new board
  let moved = false
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] !== newBoard[r][c]) {
        moved = true
        break
      }
    }
    if (moved) break
  }
  return { board: newBoard, score: moveResult.score, moved }
}

// Move down – transpose, merge right, then transpose back
const moveDown = (board: number[][]): MoveResult => {
  const transposed = transpose(board)
  const moveResult = moveRight(transposed)
  const newBoard = transpose(moveResult.board)
  let moved = false
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] !== newBoard[r][c]) {
        moved = true
        break
      }
    }
    if (moved) break
  }
  return { board: newBoard, score: moveResult.score, moved }
}

// Check if no moves are possible (i.e. game over)
const checkGameOver = (board: number[][]): boolean => {
  // If any cell is empty, the game is not over
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] === 0) return false
    }
  }
  // Check horizontal adjacent cells for a possible merge
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length - 1; c++) {
      if (board[r][c] === board[r][c + 1]) return false
    }
  }
  // Check vertical adjacent cells for a possible merge
  for (let c = 0; c < board[0].length; c++) {
    for (let r = 0; r < board.length - 1; r++) {
      if (board[r][c] === board[r + 1][c]) return false
    }
  }
  return true
}
