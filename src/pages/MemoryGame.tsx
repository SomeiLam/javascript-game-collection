import { useEffect, useState } from 'react'
import GameLayout from '../components/GameLayout'
import { Card } from '../components/MemoryGame/MemoryCard'
import StartButton from '../components/StartButton'
import StartGame from '../components/MemoryGame/StartGame'

export interface ICard {
  id: string
  pairId: string
  isFlipped: boolean
  isMatched: boolean
  src: string
}

const landmarkCards = [
  'christ-the-redeemer',
  'colosseum',
  'eiffel-tower',
  'golden-gate',
  'great-wall',
  'liberty',
  'machu-picchu',
  'mount-rushmore',
  'mt-fuji',
  'pisa',
  'pyramid',
  'taj-mahal',
]

function MemoryGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [cards, setCards] = useState<ICard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [disableClick, setDisableClick] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)

  const shuffleCards = (count: number) => {
    const selectedAnimals = landmarkCards.slice(0, count)

    const shuffled = selectedAnimals
      .flatMap((animal) => [
        {
          id: `${animal}-1`,
          pairId: `${animal}`,
          isFlipped: false,
          isMatched: false,
          src: `/cards/${animal}.jpeg`,
        },
        {
          id: `${animal}-2`,
          pairId: `${animal}`,
          isFlipped: false,
          isMatched: false,
          src: `/cards/${animal}.jpeg`,
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

  const handleStartGame = (counts: number) => {
    setGameStarted(true)
    setCards(shuffleCards(counts))
  }

  useEffect(() => {
    if (flippedCards.length === 2) {
      checkMatch()
    }
  }, [flippedCards])

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setTimeout(() => {
        setGameFinished(true)
      }, 1000)
    }
  }, [cards])

  const restartGame = () => {
    setGameFinished(false)
    setFlippedCards([])
    setCards([])
    setGameStarted(false)
  }

  return (
    <GameLayout title="Memory Game" gameFinished={gameFinished}>
      <div className="max-w-4xl mx-auto">
        <div
          className={`bg-gray-800 rounded-lg p-4 sm:p-8 ${!gameStarted ? 'border-effect purple-pink' : ''}`}
        >
          {!gameStarted ? (
            <StartGame handleStartGame={handleStartGame} />
          ) : (
            <div className="flex flex-col gap-10">
              {gameFinished && (
                <div className="text-center mt-6">
                  <h2 className="text-2xl font-bold text-[#d652ed]">
                    🎉 Congratulations! You finished the game! 🎉
                  </h2>
                  <StartButton handleStart={restartGame} label="Play Again" />
                </div>
              )}
              <div className="flex gap-3 sm:gap-5 flex-wrap justify-center">
                {cards.map((card, index) => (
                  <div key={card.id}>
                    <Card
                      card={card}
                      onClick={() => handleCardClick(index)}
                      length={cards.length / 2}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </GameLayout>
  )
}

export default MemoryGame
