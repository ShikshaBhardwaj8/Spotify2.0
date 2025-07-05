import React from "react";
import { Link } from "react-router-dom";
import { mockPlaylists, mockGenres } from "../data/mockData";
import "../App.css";
import { getUserPlaylists } from "../data/likeAndPlaylistUtils";
import { FaTimes } from "react-icons/fa";

const Sidebar = ({ isOpen, setOpen }) => {
  const recentPlaylists = mockPlaylists.slice(0, 5);
  const recentGenres = mockGenres.slice(0, 5);
  const likedSongsPlaylist = mockPlaylists.find((p) => p.id === 999);
  const userPlaylists = getUserPlaylists();

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-sidebar-btn" onClick={() => setOpen(false)}>
        <FaTimes />
      </button>

      <div className="sidebar-content">
        {/* Navigation Section */}
        <div className="sidebar-section">
          <h3>Navigation</h3>
          <nav className="sidebar-nav">
            <Link to="/" className="nav-item">
              <span role="img" aria-label="home" style={{ marginRight: 8 }}>🎵</span>
              <span>Home</span>
            </Link>
            <Link to="/search" className="nav-item">
              <span role="img" aria-label="search" style={{ marginRight: 8 }}>🔍</span>
              <span>Search</span>
            </Link>
            <Link to="/library" className="nav-item">
              <span role="img" aria-label="library" style={{ marginRight: 8 }}>📚</span>
              <span>Your Library</span>
            </Link>
          </nav>
        </div>

        {/* Playlist Section */}
        <div className="sidebar-section">
          <h3>Playlists</h3>
          <div className="sidebar-playlists">
            {likedSongsPlaylist && (
              <Link
                key={likedSongsPlaylist.id}
                to={`/playlist/${likedSongsPlaylist.id}`}
                className="playlist-item"
              >
                <span style={{ marginRight: 8 }}>❤️</span>
                <span>{likedSongsPlaylist.name}</span>
              </Link>
            )}
            {recentPlaylists
              .filter((p) => p.id !== 999)
              .map((playlist) => (
                <Link
                  key={playlist.id}
                  to={`/playlist/${playlist.id}`}
                  className="playlist-item"
                >
                  <span style={{ marginRight: 8 }}>🎧</span>
                  <span>{playlist.name}</span>
                </Link>
              ))}
          </div>
        </div>

        {/* Genre Section */}
        <div className="sidebar-section">
          <h3>Genres</h3>
          <div className="sidebar-genres">
            {recentGenres.map((genre) => (
              <Link
                key={genre.id}
                to={`/genre/${genre.id}`}
                className="genre-item"
              >
                <div
                  className="genre-color"
                  style={{ backgroundColor: genre.color }}
                >
                  <i className={`fas ${genre.icon}`}></i>
                </div>
                <span className="genre-name">{genre.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
