import { useEffect, useState } from 'react'
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
  const [counts, setCounts] = useState<number>(landmarkCards.length)
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
      setTimeout(() => {
        setGameFinished(true)
      }, 1000)
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
        <div
          className={`bg-gray-800 rounded-lg p-8 ${!gameStarted ? 'border-effect' : ''}`}
        >
          {!gameStarted ? (
            <div className="flex flex-col gap-16 justify-center items-center">
              <div className="flex justify-center items-center flex-col">
                <h2 className="text-2xl font-bold mb-4">Memory Game</h2>
                <p className="text-gray-400 max-w-[600px]">
                  Test your memory and explore the world with our vibrant,
                  AI-generated landmark cards, featuring a playful anime style
                  that brings iconic locations to life!
                </p>
                <div className="pt-10 flex flex-row gap-5 flex-wrap justify-center">
                  {[
                    'pisa',
                    'golden-gate',
                    'liberty',
                    'eiffel-tower',
                    'face-down',
                    'mt-fuji',
                    'taj-mahal',
                    'machu-picchu',
                    'colosseum',
                  ].map((card) => (
                    <img
                      src={`cards/${card}.jpeg`}
                      alt={card}
                      key={card}
                      className="w-[200px] rounded-lg shadow-md"
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-5 items-center mb-10">
                <div className="flex flex-row gap-5 items-center w-full justify-center">
                  <p className="text-xl">Card pairs</p>
                  <Minus
                    onClick={() => counts > 2 && setCounts((prev) => prev - 1)}
                    className={`${
                      counts > 2
                        ? 'text-white cursor-pointer hover:text-[#a166ab]'
                        : 'text-gray-400'
                    }`}
                  />
                  <p className="text-xl">{counts}</p>
                  <Plus
                    onClick={() =>
                      counts < landmarkCards.length &&
                      setCounts((prev) => prev + 1)
                    }
                    className={`${
                      counts < landmarkCards.length
                        ? 'text-white cursor-pointer hover:text-[#a166ab]'
                        : 'text-gray-400'
                    }`}
                  />
                </div>
                <button
                  className="custom-button py-1 px-4 text-lg rounded"
                  onClick={() => setGameStarted(true)}
                >
                  Start Game
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-5 flex-wrap justify-center">
              {cards.map((card, index) => (
                <div key={card.id}>
                  <Card
                    card={card}
                    onClick={() => handleCardClick(index)}
                    length={counts}
                  />
                </div>
              ))}
              {gameFinished && (
                <div className="text-center mt-6">
                  <h2 className="text-2xl font-bold text-[#a166ab]">
                    🎉 Congratulations! You finished the game! 🎉
                  </h2>
                  <button
                    onClick={restartGame}
                    className="mt-4 custom-button py-1 px-4 text-lg rounded"
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
