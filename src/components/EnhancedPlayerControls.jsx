import React, { useRef, useCallback, useEffect, useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaRandom,
  FaRedo,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";

const EnhancedPlayerControls = () => {
  const {
    currentSong,
    isPlaying,
    isShuffled,
    repeatMode,
    volume,
    progress,
    duration,
    togglePlay,
    playNext,
    playPrevious,
    toggleShuffle,
    toggleRepeat,
    seekTo,
    setVolumeLevel,
    pause,
  } = usePlayer();

  const playerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    if (currentSong && playerRef.current) {
      playerRef.current.style.height = `300px`;
    }
  }, [currentSong]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    const startY = e.clientY;
    if (!playerRef.current) return;
    const startHeight = playerRef.current.offsetHeight;

    const doDrag = (e) => {
      const newHeight = startHeight - (e.clientY - startY);
      if (playerRef.current && newHeight >= 90 && newHeight <= 300) {
        playerRef.current.style.height = `${newHeight}px`;
      }
    };

    const stopDrag = () => {
      window.removeEventListener("mousemove", doDrag);
      window.removeEventListener("mouseup", stopDrag);
    };

    window.addEventListener("mousemove", doDrag);
    window.addEventListener("mouseup", stopDrag);
  }, []);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    seekTo(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolumeLevel(newVolume);
  };

  const getRepeatIcon = () => {
    switch (repeatMode) {
      case "one":
        return <FaRedo style={{ color: "var(--spotify-green)" }} />;
      case "all":
        return <FaRedo />;
      default:
        return <FaRedo style={{ opacity: 0.5 }} />;
    }
  };

  if (!currentSong) {
    return (
      <div className="player-controls">
        <div className="player-info">
          <p>No song playing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="enhanced-player-controls" ref={playerRef}>
      <div
        className="resizer"
        onMouseDown={handleMouseDown}
        title="Resize player"
      ></div>
      <div className="progress-container">
        <span className="time-display">{formatTime(progress)}</span>
        <input
          type="range"
          min="0"
          max="100"
          value={duration ? (progress / duration) * 100 : 0}
          onChange={handleProgressChange}
          className="progress-bar"
        />
        <span className="time-display">{formatTime(duration)}</span>
      </div>

      {isMobile ? (
        <>
          <div className="control-buttons">
            <button
              onClick={toggleShuffle}
              className={`control-button ${isShuffled ? "active" : ""}`}
              title="Shuffle"
            >
              <FaRandom />
            </button>
            <button
              onClick={playPrevious}
              className="control-button"
              title="Previous"
            >
              <FaStepBackward />
            </button>
            <button
              onClick={togglePlay}
              className="play-button"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={playNext} className="control-button" title="Next">
              <FaStepForward />
            </button>
            <button
              onClick={toggleRepeat}
              className="control-button"
              title="Repeat"
            >
              {getRepeatIcon()}
            </button>
          </div>
          <div className="mobile-controller-bottom">
            <div className="mobile-song-info">
              <img
                src={currentSong.coverUrl}
                alt={currentSong.title}
                className="song-cover-small"
              />
              <div className="song-details">
                <h4>{currentSong.title}</h4>
                <p>{currentSong.artist}</p>
              </div>
            </div>
            <div className="mobile-volume">
              <div className="volume-slider-container">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="controls-container">
          <div className="song-info">
            <img
              src={currentSong.coverUrl}
              alt={currentSong.title}
              className="song-cover-small"
            />
            <div className="song-details">
              <h4>{currentSong.title}</h4>
              <p>{currentSong.artist}</p>
            </div>
          </div>
          <div className="main-controls">
            <div className="control-buttons">
              <button
                onClick={toggleShuffle}
                className={`control-button ${isShuffled ? "active" : ""}`}
                title="Shuffle"
              >
                <FaRandom />
              </button>
              <button
                onClick={playPrevious}
                className="control-button"
                title="Previous"
              >
                <FaStepBackward />
              </button>
              <button
                onClick={togglePlay}
                className="play-button"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button
                onClick={playNext}
                className="control-button"
                title="Next"
              >
                <FaStepForward />
              </button>
              <button
                onClick={toggleRepeat}
                className="control-button"
                title="Repeat"
              >
                {getRepeatIcon()}
              </button>
            </div>
          </div>
          <div className="volume-control-container">
            <div className="volume-control">
              <button className="volume-button" title="Volume">
                {volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
              <div className="volume-slider-container">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                />
              </div>
            </div>
            <button
              onClick={pause}
              className="control-button stop-button"
              title="Stop"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedPlayerControls;