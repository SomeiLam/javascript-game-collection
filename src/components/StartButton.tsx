import { PlayCircle } from 'lucide-react'

interface StartButtonProps {
  label?: string
  handleStart: () => void
}

const StartButton: React.FC<StartButtonProps> = ({
  label = 'Start Game',
  handleStart,
}) => {
  return (
    <button
      onClick={handleStart}
      className="mt-5 group relative bg-gradient-to-br from-indigo-400 via-purple-400 to-indigo-600 p-[2px] rounded-xl overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(129,140,248,0.4)] active:scale-[0.98]"
    >
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[10px] p-4 flex items-center justify-center gap-3 group-hover:from-indigo-500 group-hover:to-purple-500">
        <PlayCircle className="w-6 h-6 text-white" />
        <span className="font-semibold text-white text-lg">{label}</span>
      </div>
    </button>
  )
}

export default StartButton
