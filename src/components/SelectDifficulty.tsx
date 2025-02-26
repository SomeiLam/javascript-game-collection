import { Baby, Brain, Fish, Rabbit, Skull, Snail } from 'lucide-react'
import { Difficulty } from '../type'

interface SelectDifficultyProps {
  difficulty: Difficulty
  handleSetDifficulty: (difficulty: Difficulty) => void
  type: 'level' | 'speed' | 'size'
}

const SelectDifficulty: React.FC<SelectDifficultyProps> = ({
  difficulty,
  handleSetDifficulty,
  type,
}) => {
  return (
    <div className="flex flex-row gap-4 my-5">
      <button
        onClick={() => handleSetDifficulty('easy')}
        className={`group relative bg-gradient-to-br from-green-400 to-green-600 ${difficulty === 'easy' ? 'shadow-[0_0_40px_rgba(34,197,94,0.7)] cursor-default' : ' hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] active:scale-[0.98]'} p-[2px] rounded-xl overflow-hidden transition-all`}
      >
        <div
          className={`${difficulty === 'easy' ? 'bg-green-800' : 'bg-gray-800 group-hover:bg-gray-800/95'} min-w-[80px] rounded-[10px] p-3 flex flex-col items-center gap-2 `}
        >
          {type === 'level' || type === 'size' ? (
            <Baby className="w-6 h-6 text-green-400" />
          ) : (
            type === 'speed' && <Snail className="w-6 h-6 text-green-400" />
          )}
          <span className="font-semibold text-green-400">
            {type === 'level'
              ? 'Easy'
              : type === 'speed'
                ? 'Slow'
                : type === 'size' && '5 x 5'}
          </span>
        </div>
      </button>
      <button
        onClick={() => handleSetDifficulty('medium')}
        className={`group relative bg-gradient-to-br from-yellow-400 to-yellow-600 ${difficulty === 'medium' ? 'shadow-[0_0_20px_rgba(234,179,8,0.7)] cursor-default' : 'hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] active:scale-[0.98]'} p-[2px] rounded-xl overflow-hidden transition-all `}
      >
        <div
          className={`${difficulty === 'medium' ? 'bg-yellow-800' : 'bg-gray-800 group-hover:bg-gray-800/95'} min-w-[80px] rounded-[10px] p-3 flex flex-col items-center gap-2`}
        >
          {type === 'level' || type === 'size' ? (
            <Brain className="w-6 h-6 text-yellow-400" />
          ) : (
            type === 'speed' && <Fish className="w-6 h-6 text-yellow-400" />
          )}
          <span className="font-semibold text-yellow-400">
            {type === 'level'
              ? 'Medium'
              : type === 'speed'
                ? 'Medium'
                : type === 'size' && 'Classic'}
          </span>
        </div>
      </button>
      {type !== 'size' && (
        <button
          onClick={() => handleSetDifficulty('hard')}
          className={`group relative bg-gradient-to-br from-red-400 to-red-600 p-[2px] ${difficulty === 'hard' ? 'shadow-[0_0_20px_rgba(239,68,68,0.7)] cursor-default' : ' hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] active:scale-[0.98]'} rounded-xl overflow-hidden transition-all`}
        >
          <div
            className={`${difficulty === 'hard' ? 'bg-red-800' : 'bg-gray-800 group-hover:bg-gray-800/95'} min-w-[80px] rounded-[10px] p-3 flex flex-col items-center gap-2`}
          >
            {type === 'level' ? (
              <Skull className="w-6 h-6 text-red-400" />
            ) : (
              type === 'speed' && <Rabbit className="w-6 h-6 text-red-400" />
            )}
            <span className="font-semibold text-red-400">
              {type === 'level' ? 'Hard' : type === 'speed' && 'Fast'}
            </span>
          </div>
        </button>
      )}
    </div>
  )
}

export default SelectDifficulty
