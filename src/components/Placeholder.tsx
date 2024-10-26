export default function Placeholder({ width, height }: { width: number; height: number }) {
    return (
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: '#ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {width} x {height}
      </div>
    )
  }