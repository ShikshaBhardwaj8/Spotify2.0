import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
import { mockPlaylists, getSongsByPlaylist } from "../data/mockData";
import { getUserPlaylists } from "../data/likeAndPlaylistUtils";
import { mockSongs } from "../data/mockData";
import "../App.css";

const PlaylistPage = () => {
  const { id } = useParams();
  const playlistId = id;
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { playSong, currentSong, isPlaying, pause } = usePlayer();

  useEffect(() => {
    const fetchPlaylistData = () => {
      setLoading(true);

      // Log the playlistId being searched for
      console.log('Looking for playlistId:', playlistId, 'as number:', Number(playlistId));
      // Log all mockPlaylists and userPlaylists
      const userPlaylists = getUserPlaylists();
      console.log('mockPlaylists:', mockPlaylists.map(p => p.id));
      console.log('userPlaylists:', userPlaylists.map(p => p.id));

      // Try to find playlist in mockPlaylists first
      let foundPlaylist = mockPlaylists.find(
        (p) => Number(p.id) === Number(playlistId)
      );

      // If not found, try user playlists from localStorage
      if (!foundPlaylist) {
        foundPlaylist = userPlaylists.find(
          (p) => Number(p.id) === Number(playlistId)
        );
      }

      if (foundPlaylist) {
        setPlaylist(foundPlaylist);
        // Debug log
        console.log('Loaded playlist:', foundPlaylist);
        // Get songs for this playlist (by ID)
        const playlistSongs = (foundPlaylist.songs || [])
          .map((songId) => {
            const song = mockSongs.find((song) => song.id === songId);
            if (!song) console.warn('Song ID not found in mockSongs:', songId);
            return song;
          })
          .filter(Boolean);
        setSongs(playlistSongs);
        // Debug log
        console.log('Resolved songs:', playlistSongs);
      }

      setLoading(false);
    };

    fetchPlaylistData();
  }, [playlistId]);

  const handleSongClick = (song) => {
    playSong(song);
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return <div className="loading">Loading playlist...</div>;
  }

  if (!playlist) {
    return <div className="error">Playlist not found</div>;
  }

  return (
    <div className="playlist-page">
      <div className="playlist-header">
        <div className="playlist-cover-large">
          <img
            src={songs[0]?.coverUrl || "/default-cover.png"}
            alt={playlist.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-cover.png";
            }}
          />
        </div>
        <div className="playlist-info">
          <h1>{playlist.name}</h1>
          {playlist.description && <p className="description">{playlist.description}</p>}
          {playlist.creator && <p className="creator">Created by {playlist.creator}</p>}
          <p className="song-count">{songs.length} songs</p>
        </div>
      </div>

      <div className="playlist-content">
        <div className="songs-list">
          {songs.length === 0 ? (
            <div style={{ color: '#888', fontSize: '18px', marginTop: '2em' }}>No songs in this playlist yet.</div>
          ) : (
            songs.map((song, index) => (
              <div
                key={song.id}
                className={`song-item ${
                  currentSong?.id === song.id ? "playing" : ""
                }`}
                onClick={() => handleSongClick(song)}
              >
                <div className="song-number">
                  {currentSong?.id === song.id && isPlaying ? (
                    <i className="fas fa-volume-up"></i>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
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
                    <i className="fas fa-play"></i>
                  </div>
                </div>
                <div className="song-details">
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                </div>
                <div className="song-duration">
                  {formatDuration(song.duration)}
                </div>
                {currentSong?.id === song.id && isPlaying && (
                  <button
                    className="cancel-song-btn"
                    title="Stop playing"
                    onClick={e => {
                      e.stopPropagation();
                      pause && pause();
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#e0245e',
                      fontSize: '1.3em',
                      marginLeft: '12px',
                      cursor: 'pointer',
                      alignSelf: 'center',
                    }}
                  >
                    &times;
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
