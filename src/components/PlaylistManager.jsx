import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { mockPlaylists, mockSongs } from "../data/mockData";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaMusic,
  FaSave,
  FaTimes,
} from "react-icons/fa";

const PlaylistManager = () => {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isPublic: true,
  });
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [showSongSelector, setShowSongSelector] = useState(false);

  useEffect(() => {
    const userPlaylists = mockPlaylists.filter((p) => p.createdBy === user?.id);
    setPlaylists(userPlaylists);
  }, [user]);

  const handleCreatePlaylist = () => {
    if (!formData.name.trim()) return;

    const newPlaylist = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      createdBy: user.id,
      songs: selectedSongs,
      coverUrl: `https://via.placeholder.com/300x300/${Math.floor(
        Math.random() * 16777215
      ).toString(16)}/FFFFFF?text=${formData.name}`,
      isPublic: formData.isPublic,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    setPlaylists([...playlists, newPlaylist]);
    setFormData({ name: "", description: "", isPublic: true });
    setSelectedSongs([]);
    setShowCreateForm(false);
  };

  const handleEditPlaylist = (playlist) => {
    setEditingPlaylist(playlist);
    setFormData({
      name: playlist.name,
      description: playlist.description,
      isPublic: playlist.isPublic,
    });
    setSelectedSongs(playlist.songs);
    setShowCreateForm(true);
  };

  const handleUpdatePlaylist = () => {
    if (!formData.name.trim()) return;

    const updatedPlaylists = playlists.map((p) =>
      p.id === editingPlaylist.id
        ? {
            ...p,
            name: formData.name,
            description: formData.description,
            songs: selectedSongs,
            isPublic: formData.isPublic,
            updatedAt: new Date().toISOString().split("T")[0],
          }
        : p
    );

    setPlaylists(updatedPlaylists);
    setEditingPlaylist(null);
    setFormData({ name: "", description: "", isPublic: true });
    setSelectedSongs([]);
    setShowCreateForm(false);
  };

  const handleDeletePlaylist = (playlistId) => {
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      setPlaylists(playlists.filter((p) => p.id !== playlistId));
    }
  };

  const handleSongToggle = (songId) => {
    setSelectedSongs((prev) =>
      prev.includes(songId)
        ? prev.filter((id) => id !== songId)
        : [...prev, songId]
    );
  };

  const getSongById = (songId) => {
    return mockSongs.find((s) => s.id === songId);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="playlist-manager">
      <div className="playlist-manager-header">
        <h2>My Playlists🎶</h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="create-playlist-btn"
        >
          <FaPlus /> Create Playlist🎵
        </button>
      </div>

      {showCreateForm && (
        <div className="playlist-form-overlay">
          <div className="playlist-form">
            <div className="form-header">
              <h3>
                {editingPlaylist ? "Edit Playlist" : "Create New Playlist"}
              </h3>
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingPlaylist(null);
                  setFormData({ name: "", description: "", isPublic: true });
                  setSelectedSongs([]);
                }}
                className="close-btn"
              >
                <FaTimes />
              </button>
            </div>

            <div className="form-group">
              <label>Playlist Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter playlist name"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter playlist description"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.isPublic}
                  onChange={(e) =>
                    setFormData({ ...formData, isPublic: e.target.checked })
                  }
                />
                Public Playlist
              </label>
            </div>

            <div className="songs-section">
              <div className="songs-header">
                <h4>Songs ({selectedSongs.length})</h4>
                <button
                  onClick={() => setShowSongSelector(!showSongSelector)}
                  className="add-songs-btn"
                >
                  <FaMusic /> {showSongSelector ? "Hide" : "Add"} Songs
                </button>
              </div>

              {showSongSelector && (
                <div className="song-selector">
                  {mockSongs.map((song) => (
                    <div
                      key={song.id}
                      className={`song-item ${
                        selectedSongs.includes(song.id) ? "selected" : ""
                      }`}
                      onClick={() => handleSongToggle(song.id)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSongs.includes(song.id)}
                        onChange={() => {}}
                      />
                      <div className="song-info">
                        <span className="song-title">{song.title}</span>
                        <span className="song-artist">{song.artist}</span>
                      </div>
                      <span className="song-duration">
                        {formatDuration(song.duration)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {selectedSongs.length > 0 && (
                <div className="selected-songs">
                  {selectedSongs.map((songId) => {
                    const song = getSongById(songId);
                    return song ? (
                      <div key={songId} className="selected-song">
                        <span>{song.title}</span>
                        <button
                          onClick={() => handleSongToggle(songId)}
                          className="remove-song-btn"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ) : null;
                  })}
                </div>
              )}
            </div>

            <div className="form-actions">
              <button
                onClick={
                  editingPlaylist ? handleUpdatePlaylist : handleCreatePlaylist
                }
                className="save-btn"
                disabled={!formData.name.trim()}
              >
                <FaSave /> {editingPlaylist ? "Update" : "Create"} Playlist
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="playlists-grid">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="playlist-card">
            <div className="playlist-cover">
              <img src={playlist.coverUrl} alt={playlist.name} />
              <div className="playlist-overlay">
                <button
                  onClick={() => handleEditPlaylist(playlist)}
                  className="edit-btn"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeletePlaylist(playlist.id)}
                  className="delete-btn"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className="playlist-info">
              <h4>{playlist.name}</h4>
              <p>{playlist.description}</p>
              <span className="song-count">{playlist.songs.length} songs</span>
              <span
                className={`visibility ${
                  playlist.isPublic ? "public" : "private"
                }`}
              >
                {playlist.isPublic ? "Public" : "Private"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {playlists.length === 0 && (
        <div className="empty-state">
          <FaMusic size={48} />
          <h3>No playlists yet</h3>
          <p>Create your first playlist to get started!</p>
        </div>
      )}
    </div>
  );
};

export default PlaylistManager;