'use client'

type Props = {
  vimeoId: string
}

export default function VideoPlayer({ vimeoId }: Props) {
  return (
    <div
      style={{
        position: 'relative',
        paddingTop: '45.25%',
        width: '100%',
        backgroundColor: '#000',
        borderRadius: '12px',
        overflow: 'hidden'
      }}
    >
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: '0'
        }}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
