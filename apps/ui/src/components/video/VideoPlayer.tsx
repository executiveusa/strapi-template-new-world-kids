'use client'

import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { motion } from 'framer-motion'

export interface VideoPlayerProps {
  url?: string
  thumbnail?: string
  title?: string
  description?: string
  autoplay?: boolean
  controls?: boolean
  loop?: boolean
  muted?: boolean
  width?: string
  height?: string
  className?: string
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
}

export function VideoPlayer({
  url,
  thumbnail,
  title,
  description,
  autoplay = false,
  controls = true,
  loop = false,
  muted = false,
  width = '100%',
  height = '100%',
  className = '',
  onPlay,
  onPause,
  onEnded,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [showThumbnail, setShowThumbnail] = useState(!autoplay && !!thumbnail)

  const handlePlay = () => {
    setIsPlaying(true)
    setShowThumbnail(false)
    onPlay?.()
  }

  const handlePause = () => {
    setIsPlaying(false)
    onPause?.()
  }

  const handleEnded = () => {
    setIsPlaying(false)
    if (!loop && thumbnail) {
      setShowThumbnail(true)
    }
    onEnded?.()
  }

  const handleThumbnailClick = () => {
    setShowThumbnail(false)
    setIsPlaying(true)
  }

  if (!url) {
    return (
      <div className={`video-player-placeholder ${className}`}>
        <p>No video URL provided</p>
      </div>
    )
  }

  return (
    <motion.div
      className={`video-player-wrapper ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {title && (
        <div className="video-player-header">
          <h3 className="video-player-title">{title}</h3>
        </div>
      )}

      <div className="video-player-container" style={{ position: 'relative' }}>
        {showThumbnail && thumbnail ? (
          <motion.div
            className="video-player-thumbnail"
            onClick={handleThumbnailClick}
            style={{
              backgroundImage: `url(${thumbnail})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              cursor: 'pointer',
              position: 'relative',
              width,
              height,
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="play-button-overlay">
              <svg
                className="play-icon"
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="40" cy="40" r="40" fill="rgba(255,255,255,0.9)" />
                <path d="M32 24L56 40L32 56V24Z" fill="#000" />
              </svg>
            </div>
          </motion.div>
        ) : (
          <ReactPlayer
            url={url}
            playing={isPlaying}
            controls={controls}
            loop={loop}
            muted={muted}
            width={width}
            height={height}
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handleEnded}
            config={{
              youtube: {
                playerVars: { showinfo: 1 },
              },
              vimeo: {
                playerOptions: { byline: false },
              },
            }}
          />
        )}
      </div>

      {description && (
        <div className="video-player-description">
          <p>{description}</p>
        </div>
      )}

      <style jsx>{`
        .video-player-wrapper {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .video-player-header {
          padding: 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .video-player-title {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
        }

        .video-player-container {
          background: #000;
          min-height: 300px;
        }

        .video-player-thumbnail {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .play-button-overlay {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        .play-button-overlay:hover {
          transform: scale(1.1);
        }

        .play-icon {
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
        }

        .video-player-description {
          padding: 16px;
          background: #f8f9fa;
          border-top: 1px solid #e9ecef;
        }

        .video-player-description p {
          margin: 0;
          color: #495057;
          line-height: 1.6;
        }

        .video-player-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          background: #f8f9fa;
          border-radius: 12px;
          color: #6c757d;
        }
      `}</style>
    </motion.div>
  )
}

export default VideoPlayer
