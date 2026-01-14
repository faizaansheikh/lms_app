'use client'

import { useEffect, useRef, useState } from 'react'
import Player from '@vimeo/player'
import { Spin } from 'antd'

export default function VideoPlayer({ vimeoId, setComplete, videoDetails }: { vimeoId: string, setComplete: any, videoDetails: any }) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const maxWatchedRef = useRef(0)
  const completedRef = useRef(false)
  const [canPlay, setCanPlay] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log("chala...")
    if (!videoDetails.is_completed) {
      completedRef.current = false
      maxWatchedRef.current = 0
      if (!iframeRef.current) return

      const player = new Player(iframeRef.current)

      player.ready()
        .then(() => {
          setCanPlay(true)
        })
        .catch((err) => {
          console.log(err)
        })

      // ❌ Video failed to load / restricted
      player.on('error', (err) => {
        if (err) {
          console.warn('Vimeo chapters metadata bug ignored')
          return
        }

        console.error('Vimeo error:', err)
        setError('Video is unavailable or cannot be played.')
        setCanPlay(false)
      })

      player.on('timeupdate', (data) => {
        if (data.seconds > maxWatchedRef.current + 1) {
          player.setCurrentTime(maxWatchedRef.current)
        } else {
          maxWatchedRef.current = data.seconds
        }
      })

      player.on('progress', (data) => {
        if (data.percent >= 0.9 && !completedRef.current) {
          completedRef.current = true
          setComplete(true)
          // player.destroy()
          console.log('Lesson completed')
        }
      })
      console.log('run....')


    }

  }, [vimeoId])

  if (error) {
    return (
      <div className="flex items-center justify-center bg-black text-white h-[400px] rounded-lg">
        <p>{error}</p>
      </div>
    )
  }
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
        ref={iframeRef}
        src={`https://player.vimeo.com/video/${vimeoId}?texttrack=off` || ''}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: '0'
        }}
        allow="autoplay; fullscreen;"
        allowFullScreen
      />
      {/* {!canPlay && !error && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <Spin />
        </div>
      )} */}
    </div>

  )
}
