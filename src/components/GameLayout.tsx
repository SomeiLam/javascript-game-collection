import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home } from 'lucide-react'

interface GameLayoutProps {
  children: React.ReactNode
  title: string
  gameFinished?: boolean
  noScroll?: boolean
}

const GameLayout: React.FC<GameLayoutProps> = ({
  children,
  title,
  gameFinished,
  noScroll,
}) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (noScroll) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [noScroll])

  return (
    <div
      className="min-h-screen bg-gray-900 text-white"
      style={{
        height: noScroll ? '100dvh' : '100%',
        overflow: noScroll ? 'hidden' : 'auto',
      }} // Ensure full height
    >
      {gameFinished && (
        <div className="pyro">
          <div className="before"></div>
          <div className="after"></div>
        </div>
      )}

      {/* Navigation Bar */}
      <nav className="bg-gray-800 shadow-lg w-full flex-none">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold">{title}</h1>
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </button>
        </div>
      </nav>

      {/* Main Content Adjusted */}
      <main
        className={`w-full mx-auto px-4 py-8 flex-grow ${
          noScroll ? 'overflow-hidden' : 'overflow-auto'
        }`}
        style={{ height: noScroll ? 'calc(100dvh - 64px)' : 'h-full' }}
      >
        {children}
      </main>
    </div>
  )
}

export default GameLayout
