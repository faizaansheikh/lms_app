'use client'

import { useEffect, useRef, useState } from 'react'
import Player from '@vimeo/player'
import { message, Spin } from 'antd'
import ReactPlayer from 'react-player'
import { ReactPlayerProps } from 'react-player/types'
export default function VideoPlayer({ vimeoId, setComplete, videoDetails }: { vimeoId: string, setComplete: any, videoDetails: any }) {
  const [state, setState] = useState(false)
  const handleEnded = (e: any) => {
    if (!videoDetails.is_completed) {
      message.success('Video completed successfully!....')
      setComplete(true)
    }

  }
  const handleSeek = () => {
    if (!videoDetails.is_completed) {
      message.warning('Please watch complete lecture!')
      setState(true)
      setTimeout(() => {
        setState(false)
      }, 200);
    }

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
      {
        !state && <ReactPlayer
          src={`https://player.vimeo.com/video/${vimeoId}` || ''}
          // playing={true}  
          //   playing
          controls
          // onRateChange={(rate) => console.log("Rate:", rate)}
          onEnded={handleEnded}
          onSeeking={handleSeek}

          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: '0'
          }}
        />
      }

    </div>

  )
}
