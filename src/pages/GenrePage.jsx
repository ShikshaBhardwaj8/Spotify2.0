import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
import { mockGenres, getSongsByGenre } from "../data/mockData";
import "../App.css";

const GenrePage = () => {
  const { id } = useParams();
  const [genre, setGenre] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { playSong, currentSong, isPlaying } = usePlayer();

  useEffect(() => {
    const fetchGenreData = () => {
      setLoading(true);

      // Find genre from mock data
      const foundGenre = mockGenres.find((g) => g.id === parseInt(id));

      if (foundGenre) {
        setGenre(foundGenre);
        // Get songs for this genre
        const genreSongs = getSongsByGenre(parseInt(id));
        setSongs(genreSongs);
      }

      setLoading(false);
    };

    fetchGenreData();
  }, [id]);

  const handleSongClick = (song) => {
    playSong(song);
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return <div className="loading">Loading genre...</div>;
  }

  if (!genre) {
    return <div className="error">Genre not found</div>;
  }

  return (
    <div className="genre-page">
      <div className="genre-header">
        <div className="genre-cover-large">
          <div
            className="genre-color-block"
            style={{ backgroundColor: genre.color }}
          >
            <i className={`fas ${genre.icon}`}></i>
          </div>
        </div>
        <div className="genre-info">
          <h1>{genre.name}</h1>
          <p className="description">{genre.description}</p>
          <p className="song-count">{songs.length} songs</p>
        </div>
      </div>

      <div className="genre-content">
        <div className="songs-grid">
          {songs.map((song) => (
            <div
              key={song.id}
              className={`song-card ${
                currentSong?.id === song.id ? "playing" : ""
              }`}
              onClick={() => handleSongClick(song)}
            >
              <div className="song-cover">
                <img
                  src={song.coverUrl}
                  alt={song.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-cover.png";
                  }}
                />
                <div className="play-overlay">
                  {currentSong?.id === song.id && isPlaying ? (
                    <i className="fas fa-pause"></i>
                  ) : (
                    <i className="fas fa-play"></i>
                  )}
                </div>
              </div>
              <div className="song-info">
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
                <span className="duration">
                  {formatDuration(song.duration)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenrePage;
