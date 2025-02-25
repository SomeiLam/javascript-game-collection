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
      className={`bg-gray-900 text-white ${gameFinished ? 'pyro' : ''} ${
        noScroll ? 'h-[100dvh] overflow-hidden flex flex-col' : 'min-h-screen'
      }`}
    >
      {/* Navigation */}
      <nav className="bg-gray-800 shadow-lg z-10 w-full">
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

      {/* Main Content */}
      <main
        className={`container mx-auto px-4 py-8 flex-1 ${
          noScroll ? 'flex items-center justify-center' : ''
        }`}
      >
        {children}
      </main>
    </div>
  )
}

export default GameLayout
