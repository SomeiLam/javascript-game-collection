import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Home } from 'lucide-react'

interface GameLayoutProps {
  children: React.ReactNode
  title: string
  gameFinished?: boolean
  noScroll?: boolean
}

// const GameLayout: React.FC<GameLayoutProps> = ({
//   children,
//   title,
//   gameFinished,
//   noScroll,
// }) => {
//   const navigate = useNavigate()

//   return (
//     <div
//       className={`${noScroll ? 'max-h-dvh overflow-hidden' : 'h-full'} bg-gray-900 text-white ${gameFinished ? 'pyro' : ''}`}
//     >
//       <div className="before" />
//       <div className="after" />
//       <nav className="bg-gray-800 shadow-lg">
//         <div className="container mx-auto px-4 py-3 flex items-center justify-between">
//           <h1 className="text-xl font-bold">{title}</h1>
//           <button
//             onClick={() => navigate('/')}
//             className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 flex items-center gap-2"
//           >
//             <Home className="w-5 h-5" />
//             <span>Home</span>
//           </button>
//         </div>
//       </nav>
//       <main className="container mx-auto px-4 py-8">{children}</main>
//     </div>
//   )
// }

const GameLayout: React.FC<GameLayoutProps> = ({
  children,
  title,
  gameFinished,
  noScroll,
}) => {
  const navigate = useNavigate()

  return (
    <div
      className={`flex flex-col bg-gray-900 text-white ${
        gameFinished ? 'pyro' : ''
      }`}
      style={{ height: noScroll ? '100dvh' : '100%' }} // Ensure full height
    >
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
        className={`container mx-auto px-4 py-8 flex-grow ${
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
