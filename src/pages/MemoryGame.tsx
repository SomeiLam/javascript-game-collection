import React, { useEffect, useState } from 'react'
import GameLayout from '../components/GameLayout'
import { Card } from '../components/MemoryGame/MemoryCard'
import { Minus, Plus } from 'lucide-react'

export interface ICard {
  id: string
  pairId: string
  isFlipped: boolean
  isMatched: boolean
  src: string
}

const animalCards = [
  'bear',
  'black-bear',
  'deer',
  'elephant',
  'giraffe',
  'kappa',
  'koala',
  'monkey',
  'panda',
  'sheep',
]

function MemoryGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [counts, setCounts] = useState<number>(animalCards.length)
  const [cards, setCards] = useState<ICard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [disableClick, setDisableClick] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)

  const shuffleCards = (count: number) => {
    const selectedAnimals = animalCards.slice(0, count)

    const shuffled = selectedAnimals
      .flatMap((animal) => [
        {
          id: `${animal}-1`,
          pairId: `${animal}`,
          isFlipped: false,
          isMatched: false,
          src: `/cards/${animal}.png`,
        },
        {
          id: `${animal}-2`,
          pairId: `${animal}`,
          isFlipped: false,
          isMatched: false,
          src: `/cards/${animal}.png`,
        },
      ])
      .sort(() => Math.random() - 0.5)

    return shuffled
  }

  const handleCardClick = (index: number) => {
    if (disableClick || cards[index].isFlipped || cards[index].isMatched) return

    setCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...card, isFlipped: true } : card
      )
    )

    setFlippedCards((prev) => [...prev, index])
  }

  const checkMatch = () => {
    if (flippedCards.length !== 2) return

    const [firstIndex, secondIndex] = flippedCards
    const firstCard = cards[firstIndex]
    const secondCard = cards[secondIndex]

    if (!firstCard || !secondCard) return

    setDisableClick(true) // Prevents additional clicks while checking

    if (firstCard.pairId === secondCard.pairId) {
      // ✅ Cards match: Mark them as matched
      setCards((prevCards) =>
        prevCards.map((card, i) =>
          i === firstIndex || i === secondIndex
            ? { ...card, isMatched: true }
            : card
        )
      )
    } else {
      // ❌ No match: Flip them back after 1 second
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card, i) =>
            i === firstIndex || i === secondIndex
              ? { ...card, isFlipped: false }
              : card
          )
        )
      }, 1000)
    }

    setTimeout(() => {
      setFlippedCards([]) // Reset flipped cards
      setDisableClick(false) // Re-enable clicking
    }, 1000)
  }

  useEffect(() => {
    if (flippedCards.length === 2) {
      checkMatch()
    }
  }, [flippedCards])

  useEffect(() => {
    if (!gameStarted) return
    setCards(shuffleCards(counts))
  }, [gameStarted, counts])

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setGameFinished(true)
    }
  }, [cards])

  const restartGame = () => {
    setGameFinished(false)
    setFlippedCards([])
    setCards(shuffleCards(counts))
    setGameStarted(false)
  }

  return (
    <GameLayout title="Memory Game" gameFinished={gameFinished}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg py-16 px-8">
          {!gameStarted ? (
            <div className="flex flex-col gap-5 justify-center items-center">
              <div className="flex flex-row gap-5 items-center w-full justify-center">
                <p className="text-xl">Card pairs</p>
                <Minus
                  onClick={() => counts > 2 && setCounts((prev) => prev - 1)}
                  className={`${
                    counts > 2
                      ? 'text-white cursor-pointer hover:text-yellow-600'
                      : 'text-gray-400'
                  }`}
                />
                <p className="text-xl">{counts}</p>
                <Plus
                  onClick={() =>
                    counts < animalCards.length && setCounts((prev) => prev + 1)
                  }
                  className={`${
                    counts < animalCards.length
                      ? 'text-white cursor-pointer hover:text-yellow-600'
                      : 'text-gray-400'
                  }`}
                />
              </div>
              <button
                className="bg-[#6c91e7] hover:bg-[#5c83de] py-1 px-4 text-lg rounded"
                onClick={() => setGameStarted(true)}
              >
                Start Game 🚀
              </button>
            </div>
          ) : (
            <div className="flex gap-5 flex-wrap justify-center">
              {cards.map((card, index) => (
                <div key={card.id}>
                  <Card card={card} onClick={() => handleCardClick(index)} />
                </div>
              ))}
              {gameFinished && (
                <div className="text-center mt-6">
                  <h2 className="text-2xl font-bold text-green-600">
                    🎉 Congratulations! You finished the game! 🎉
                  </h2>
                  <button
                    onClick={restartGame}
                    className="mt-4 px-6 py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600"
                  >
                    Play Again
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </GameLayout>
  )
}

export default MemoryGame
