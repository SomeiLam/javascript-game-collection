import { useEffect, useState } from 'react'
import GameLayout from '../components/GameLayout'
import StartGame from '../components/Sudoku/StartGame'
import { Lightbulb, RotateCcw, SearchX } from 'lucide-react'
import StartButton from '../components/StartButton'

type Board = number[][]
export type Difficulty = 'easy' | 'medium' | 'hard'

const easyEmptyCells = 30
const mediumEmptyCells = 40
const hardEmptyCells = 50

const generateSudoku = (difficulty = 'medium') => {
  const generateSudokuBoard = () => {
    const board = new Array(9).fill(null).map(() => new Array(9).fill(0))

    const isValidPlacement = (
      board: Board,
      row: number,
      col: number,
      num: number
    ) => {
      for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) {
          return false
        }
      }

      const startRow = Math.floor(row / 3) * 3
      const startCol = Math.floor(col / 3) * 3
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[startRow + i][startCol + j] === num) {
            return false
          }
        }
      }
      return true
    }

    const fillBoard = (board: Board) => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === 0) {
            const numbers = [...Array(9).keys()]
              .map((n) => n + 1)
              .sort(() => Math.random() - 0.5)
            for (const num of numbers) {
              if (isValidPlacement(board, row, col, num)) {
                board[row][col] = num
                if (fillBoard(board)) {
                  return true
                }
                board[row][col] = 0
              }
            }
            return false
          }
        }
      }
      return true
    }

    fillBoard(board)
    return board
  }

  const removeNumbersForDifficulty = (board: Board, difficulty: Difficulty) => {
    let attempts =
      difficulty === 'easy'
        ? easyEmptyCells
        : difficulty === 'medium'
          ? mediumEmptyCells
          : hardEmptyCells
    const boardCopy = board.map((row) => [...row])

    while (attempts > 0) {
      const row = Math.floor(Math.random() * 9)
      const col = Math.floor(Math.random() * 9)
      if (boardCopy[row][col] !== 0) {
        boardCopy[row][col] = 0
        attempts--
      }
    }
    return boardCopy
  }

  const solvedBoard = generateSudokuBoard()
  const puzzleBoard = removeNumbersForDifficulty(
    solvedBoard,
    difficulty as Difficulty
  )
  return { solvedBoard, puzzleBoard }
}

const Sudoku = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [board, setBoard] = useState<Board>([])
  const [originalBoard, setOriginalBoard] = useState<Board>([])
  const [solvedBoard, setSolvedBoard] = useState<Board>([])
  const [gameStarted, setGameStarted] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [selectedCell, setSelectedCell] = useState<{
    row: number
    col: number
  } | null>(null)
  const [hintCells, setHintCells] = useState(new Set<string>())
  const [mistakeCell, setMistakeCell] = useState<string | null>(null)

  const handleStartGame = (difficulty: Difficulty) => {
    setDifficulty(difficulty)
    setGameStarted(true)
  }

  const checkSolution = (boardToCheck: Board) => {
    return boardToCheck.every((row, rowIndex) =>
      row.every((cell, colIndex) => cell === solvedBoard[rowIndex][colIndex])
    )
  }

  const handleHint = () => {
    const emptyCells = []
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          emptyCells.push({ row, col })
        }
      }
    }

    if (emptyCells.length > 0) {
      const randomCell =
        emptyCells[Math.floor(Math.random() * emptyCells.length)]
      const newBoard = board.map((r, rowIndex) =>
        r.map((cell, colIndex) =>
          rowIndex === randomCell.row && colIndex === randomCell.col
            ? solvedBoard[rowIndex][colIndex]
            : cell
        )
      )
      setBoard(newBoard)
      setHintCells((prev) =>
        new Set(prev).add(`${randomCell.row}-${randomCell.col}`)
      )
      if (emptyCells.length === 1) {
        handleFinishgame(newBoard)
      }
    }
  }

  const findMistake = () => {
    const mistakes = []
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        console.log(
          board[row][col],
          solvedBoard[row][col],
          board[row][col] !== 0 && board[row][col] !== solvedBoard[row][col]
        )
        if (
          board[row][col] !== 0 &&
          board[row][col] !== solvedBoard[row][col]
        ) {
          mistakes.push(`${row}-${col}`)
        }
      }
    }
    if (mistakes.length > 0) {
      setMistakeCell(mistakes[Math.floor(Math.random() * mistakes.length)])
    }
  }

  const handleNumberClick = (number: number) => {
    if (selectedCell) {
      const selectedIndex = `${selectedCell.row}-${selectedCell.col}`
      if (mistakeCell === selectedIndex) {
        setMistakeCell(null)
      }
      const { row, col } = selectedCell
      if (originalBoard[row][col] === 0) {
        const newBoard = board.map((r, rowIndex) =>
          r.map((cell, colIndex) =>
            rowIndex === row && colIndex === col ? number : cell
          )
        )
        setBoard(newBoard)
        handleFinishgame(newBoard)
      }
    }
  }

  const handleFinishgame = (newBoard: Board) => {
    if (checkSolution(newBoard)) {
      setTimeout(() => {
        setGameFinished(true)
        setSelectedCell(null)
      }, 1000)
    }
  }

  const restartGame = () => {
    setGameFinished(false)
    setGameStarted(false)
    setSelectedCell(null)
  }

  useEffect(() => {
    setTimeout(() => {
      setMistakeCell(null)
    }, 3000)
  }, [mistakeCell])

  useEffect(() => {
    if (gameStarted) {
      const { solvedBoard, puzzleBoard } = generateSudoku(difficulty)
      setBoard(puzzleBoard)
      setOriginalBoard(puzzleBoard.map((row) => [...row]))
      setSolvedBoard(solvedBoard)
    }
  }, [difficulty, gameStarted])

  return (
    <GameLayout title="Sudoku" gameFinished={gameFinished}>
      <div className="max-w-4xl mx-auto">
        <div
          className={`bg-gray-800 rounded-lg p-4 sm:p-8 ${!gameStarted ? 'border-effect blue-cyan' : ''}`}
        >
          {!gameStarted ? (
            <StartGame handleStartGame={handleStartGame} />
          ) : (
            <div className="sm:w-3/4 mx-auto">
              {gameFinished ? (
                <div className="text-center my-10">
                  <h2 className="text-2xl font-bold text-[#d652ed]">
                    🎉 Congratulations! You finished the game! 🎉
                  </h2>
                  <StartButton handleStart={restartGame} label="Play Again" />
                </div>
              ) : (
                <div className="flex gap-3 justify-end mb-5">
                  <button
                    onClick={findMistake}
                    disabled={!!mistakeCell}
                    className={`flex items-center gap-2 px-4 py-2 ${mistakeCell ? 'bg-gray-700 text-gray-600' : 'bg-orange-500 hover:bg-orange-600 transition-colors'}  text-white rounded-lg`}
                  >
                    <SearchX className="w-5 h-5" />
                    Find Mistake
                  </button>
                  <button
                    onClick={handleHint}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Lightbulb className="w-5 h-5" />
                    Hint
                  </button>
                  <button
                    onClick={restartGame}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Restart
                  </button>
                </div>
              )}
              <div className="grid grid-cols-9 gap-[1px] bg-gray-600 p-[1px] rounded-lg">
                {board.map((row, rowIndex) =>
                  row.map((cell, colIndex) => {
                    const blockRow = Math.floor(rowIndex / 3)
                    const blockCol = Math.floor(colIndex / 3)
                    const isEvenBlock = (blockRow + blockCol) % 2 === 0
                    const isPreFilled = originalBoard[rowIndex][colIndex] !== 0
                    const isSelected =
                      selectedCell?.row === rowIndex &&
                      selectedCell?.col === colIndex
                    const cellKey = `${rowIndex}-${colIndex}`
                    const isHint = hintCells.has(cellKey)
                    const isMistake = mistakeCell === cellKey

                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() =>
                          !isPreFilled &&
                          setSelectedCell({ row: rowIndex, col: colIndex })
                        }
                        className={`
                                    aspect-square flex items-center justify-center
                                    ${isEvenBlock ? 'bg-gray-800' : 'bg-[#2D3748]'}
                                    ${isPreFilled ? 'text-gray-300' : isHint ? 'text-green-400' : 'text-indigo-400'}
                                    text-xl font-semibold
                                     transition-colors
                                    ${isSelected ? 'cell-effect' : isPreFilled ? '' : 'cursor-pointer hover:bg-gray-700'}
                                    ${isMistake ? 'mistake' : ''}
                                `}
                      >
                        {cell !== 0 ? cell : ''}
                      </div>
                    )
                  })
                )}
              </div>
              <div className="mt-8 grid grid-cols-3 sm:grid-cols-9 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                  <button
                    onClick={() => handleNumberClick(number)}
                    disabled={!selectedCell}
                    key={number}
                    className={`bg-gray-700 ${selectedCell ? 'text-white' : 'text-gray-500'}  text-xl font-semibold py-4 rounded-lg hover:bg-gray-600 transition-colors`}
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </GameLayout>
  )
}

export default Sudoku
