import './Tile.css'

interface TileProps {
  value: number
}

const Tile: React.FC<TileProps> = ({ value }) => {
  const tileStyle = getTileStyle(value)
  return <div className={`tile ${tileStyle}`}>{value !== 0 ? value : ''}</div>
}

const getTileStyle = (value: number): string => {
  switch (value) {
    case 2:
      return 'tile-2'
    case 4:
      return 'tile-4'
    case 8:
      return 'tile-8'
    case 16:
      return 'tile-16'
    case 32:
      return 'tile-32'
    case 64:
      return 'tile-64'
    case 128:
      return 'tile-128'
    case 256:
      return 'tile-256'
    case 512:
      return 'tile-512'
    case 1024:
      return 'tile-1024'
    case 2048:
      return 'tile-2048'
    default:
      return 'tile-default'
  }
}

export { Tile }
