import React, { useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import {
  mockSongs,
  mockAlbums,
  mockPlaylists,
  getLikedSongs,
  addLikedSongToPlaylist,
  removeLikedSongFromPlaylist,
} from "../data/mockData";
import "../App.css";

import {
  isSongLiked,
  likeSong,
  unlikeSong,
  getUserPlaylists,
  addSongToPlaylist,
  createPlaylist,
} from "../data/likeAndPlaylistUtils";

const Home = () => {
  const { playSong } = usePlayer();
  const popularTracks = mockSongs;
  const featuredAlbums = mockAlbums.slice(0, 4);
  const featuredPlaylists = mockPlaylists.slice(0, 4);

  const [likeState, setLikeState] = useState(() =>
    popularTracks.map((song) => isSongLiked(song.id))
  );
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState(null);
  const [playlists, setPlaylists] = useState(getUserPlaylists());
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [playlistMessage, setPlaylistMessage] = useState("");
  const [playlistModalTab, setPlaylistModalTab] = useState("choose");

  const handleSongClick = (song) => {
    playSong(song);
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleLikeClick = (song, idx) => {
    if (getLikedSongs().includes(song.id)) {
      unlikeSong(song.id);
      removeLikedSongFromPlaylist(song.id);
    } else {
      likeSong(song.id);
      addLikedSongToPlaylist(song.id);
    }
    setLikeState((prev) => {
      const updated = [...prev];
      updated[idx] = !prev[idx];
      return updated;
    });
  };

  const handleAddToPlaylistClick = (songId) => {
    setSelectedSongId(songId);
    setShowPlaylistModal(true);
    setPlaylists(getUserPlaylists());
    setPlaylistMessage("");
    setPlaylistModalTab("choose");
  };

  const handleSelectPlaylist = (playlistId) => {
    addSongToPlaylist(playlistId, selectedSongId);
    setPlaylists(getUserPlaylists());
    setPlaylistMessage("🎵 Song added to playlist!");
    setTimeout(() => setPlaylistMessage(""), 1500);
  };

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      const newPlaylist = createPlaylist(newPlaylistName.trim());
      addSongToPlaylist(newPlaylist.id, selectedSongId);
      setPlaylists(getUserPlaylists());
      setNewPlaylistName("");
      setPlaylistMessage("🎉 Playlist created and song added!");
      setTimeout(() => setPlaylistMessage(""), 1500);
    }
  };

  return (
    <div className="home-page fade-in">
      <div className="home-header gradient-bg">
        <h1>
          Welcome to <span className="highlight">Spotify 2.0</span>
        </h1>
        <p>Discover and enjoy your favorite music</p>
      </div>

      <div className="home-content">
        {/* Popular Tracks */}
        <section className="section">
          <h2 className="section-title">🔥 Popular Tracks</h2>
          <div className="songs-grid">
            {popularTracks.map((song, idx) => (
              <div key={song.id} className="song-card card-hover">
                <div className="song-cover" onClick={() => handleSongClick(song)}>
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
                <div className="song-meta">
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                  <span className="duration">{formatDuration(song.duration)}</span>
                </div>
                <div className="song-actions">
                  <button
                    className="like-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLikeClick(song, idx);
                    }}
                    title={isSongLiked(song.id) ? "Unlike" : "Like"}
                  >
                    <i
                      className={isSongLiked(song.id) ? "fas fa-heart" : "far fa-heart"}
                    ></i>
                  </button>
                  <button
                    className="playlist-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToPlaylistClick(song.id);
                    }}
                    title="Add to Playlist"
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Albums */}
        <section className="section">
          <h2 className="section-title">🎧 Featured Albums</h2>
          <div className="albums-grid">
            {featuredAlbums.map((album) => (
              <div key={album.id} className="album-card card-hover">
                <div className="album-cover">
                  <img
                    src={album.coverUrl}
                    alt={album.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-cover.png";
                    }}
                  />
                  <div className="play-overlay">
                    <i className="fas fa-play"></i>
                  </div>
                </div>
                <div className="album-info">
                  <h3>{album.name}</h3>
                  <p>{album.artist}</p>
                  <span className="year">{album.year}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Playlists */}
        <section className="section">
          <h2 className="section-title">📻 Featured Playlists</h2>
          <div className="playlists-grid">
            {featuredPlaylists.map((playlist) => (
              <div key={playlist.id} className="playlist-card card-hover">
                <div className="playlist-cover">
                  <img
                    src={playlist.coverUrl}
                    alt={playlist.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-cover.png";
                    }}
                  />
                  <div className="play-overlay">
                    <i className="fas fa-play"></i>
                  </div>
                </div>
                <div className="playlist-info">
                  <h3>{playlist.name}</h3>
                  <p>{playlist.description}</p>
                  <span className="song-count">{playlist.songs.length} songs</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Playlist Modal (optional UI implementation based on your app structure) */}
      {showPlaylistModal && (
        <div className="playlist-modal-overlay" onClick={() => setShowPlaylistModal(false)}>
          <div className="playlist-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Add to Playlist</h3>

            <div>
              <h4>Select Playlist</h4>
              {playlists.length === 0 ? (
                <p>No playlists found.</p>
              ) : (
                <ul>
                  {playlists.map((playlist) => (
                    <li key={playlist.id}>
                      <button onClick={() => handleSelectPlaylist(playlist.id)}>
                        {playlist.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div style={{ marginTop: "12px" }}>
              <h4>Create New Playlist</h4>
              <input
                type="text"
                placeholder="Playlist name"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
              />
              <button onClick={handleCreatePlaylist}>Create & Add</button>
            </div>

            {playlistMessage && <div className="success-message">{playlistMessage}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
