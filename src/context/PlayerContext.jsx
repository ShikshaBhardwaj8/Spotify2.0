import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

const PlayerContext = createContext();

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState("none");
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffledPlaylist, setShuffledPlaylist] = useState([]);

  const audioRef = useRef(new Audio());

  // Setup audio events
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;

    const updateProgress = () => setProgress(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnd = () => {
      repeatMode === "one" ? audio.play() : playNext();
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnd);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnd);
    };
  }, [repeatMode]);

  // Shuffle effect
  useEffect(() => {
    if (isShuffled && currentPlaylist.length) {
      const shuffled = [...currentPlaylist].sort(() => Math.random() - 0.5);
      setShuffledPlaylist(shuffled);
    }
  }, [isShuffled, currentPlaylist]);

  const playSong = (song, playlist = [], index = 0) => {
    if (!song?.audioUrl) return;
    setCurrentSong(song);
    setCurrentPlaylist(playlist);
    setCurrentIndex(index);

    audioRef.current.src = song.audioUrl;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!currentSong) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    const list = isShuffled ? shuffledPlaylist : currentPlaylist;
    const nextIndex = currentIndex + 1;
    if (nextIndex >= list.length) {
      if (repeatMode === "all") playSong(list[0], currentPlaylist, 0);
      else setIsPlaying(false);
    } else {
      playSong(list[nextIndex], currentPlaylist, nextIndex);
    }
  };

  const playPrevious = () => {
    const list = isShuffled ? shuffledPlaylist : currentPlaylist;
    const prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      if (repeatMode === "all") playSong(list[list.length - 1], currentPlaylist, list.length - 1);
    } else {
      playSong(list[prevIndex], currentPlaylist, prevIndex);
    }
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
    setCurrentSong(null);
  };

  const toggleShuffle = () => setIsShuffled((prev) => !prev);

  const toggleRepeat = () => {
    const modes = ["none", "all", "one"];
    const next = modes[(modes.indexOf(repeatMode) + 1) % modes.length];
    setRepeatMode(next);
  };

  const seekTo = (time) => {
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  const setVolumeLevel = (level) => {
    setVolume(level);
    audioRef.current.volume = level;
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        currentPlaylist,
        currentIndex,
        isPlaying,
        isShuffled,
        repeatMode,
        volume,
        progress,
        duration,
        playSong,
        playNext,
        playPrevious,
        togglePlay,
        toggleShuffle,
        toggleRepeat,
        seekTo,
        setVolumeLevel,
        pause,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};