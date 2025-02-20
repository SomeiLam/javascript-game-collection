import { useNavigate } from 'react-router-dom'
import {
  TowerControl as GameController,
  ScanFace,
  Sword,
  Dices,
} from 'lucide-react'
import GameCard from '../components/MemoryGame/GameCard'

function Home() {
  const navigate = useNavigate()

  const games = [
    {
      title: 'Memory Game',
      description: 'Test your memory by matching pairs of cards',
      icon: <ScanFace className="w-8 h-8" />,
      path: '/memory',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Rock Paper Scissors',
      description: 'Classic game of chance against the computer',
      icon: <GameController className="w-8 h-8" />,
      path: '/rps',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Snake Game',
      description: 'Guide the snake to eat food and grow longer',
      icon: <Sword className="w-8 h-8" />,
      path: '/snake',
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: '2048',
      description: 'Combine numbers to reach 2048',
      icon: <Dices className="w-8 h-8" />,
      path: '/2048',
      color: 'from-orange-500 to-yellow-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            JavaScript Game Collection
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Explore our collection of classic games reimagined with modern
            JavaScript. Challenge yourself and have fun!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard
              key={game.title}
              {...game}
              onClick={() => navigate(game.path)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
