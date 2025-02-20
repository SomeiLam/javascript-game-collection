import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MemoryGame from './pages/MemoryGame'
import RockPaperScissors from './pages/RockPaperScissors'
import SnakeGame from './pages/SnakeGame'
import Game2048 from './pages/Game2048'

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memory" element={<MemoryGame />} />
        <Route path="/rps" element={<RockPaperScissors />} />
        <Route path="/snake" element={<SnakeGame />} />
        <Route path="/2048" element={<Game2048 />} />
      </Routes>
    </div>
  )
}

export default App
