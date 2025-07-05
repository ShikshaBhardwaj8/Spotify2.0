// Utility for managing liked songs and playlists in localStorage

const LIKED_SONGS_KEY = "likedSongs";
const USER_PLAYLISTS_KEY = "userPlaylists";

// --- LIKES ---
export function getLikedSongs() {
  const data = localStorage.getItem(LIKED_SONGS_KEY);
  return data ? JSON.parse(data) : [];
}

export function isSongLiked(songId) {
  return getLikedSongs().includes(songId);
}

export function likeSong(songId) {
  const liked = getLikedSongs();
  if (!liked.includes(songId)) {
    liked.push(songId);
    localStorage.setItem(LIKED_SONGS_KEY, JSON.stringify(liked));
  }
}

export function unlikeSong(songId) {
  const liked = getLikedSongs().filter((id) => id !== songId);
  localStorage.setItem(LIKED_SONGS_KEY, JSON.stringify(liked));
}

// --- PLAYLISTS ---
export function getUserPlaylists() {
  const data = localStorage.getItem(USER_PLAYLISTS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveUserPlaylists(playlists) {
  localStorage.setItem(USER_PLAYLISTS_KEY, JSON.stringify(playlists));
}

export function addSongToPlaylist(playlistId, songId) {
  const playlists = getUserPlaylists();
  const idx = playlists.findIndex((p) => p.id === playlistId);
  if (idx !== -1 && !playlists[idx].songs.includes(songId)) {
    playlists[idx].songs.push(songId);
    saveUserPlaylists(playlists);
  }
}

export function removeSongFromPlaylist(playlistId, songId) {
  const playlists = getUserPlaylists();
  const playlist = playlists.find((p) => p.id === playlistId);
  if (playlist) {
    playlist.songs = playlist.songs.filter((s) => s !== songId);
    saveUserPlaylists(playlists);
  }
}

export function createPlaylist(name) {
  const playlists = getUserPlaylists();
  const newPlaylist = {
    id: Date.now(),
    name,
    songs: [],
  };
  playlists.push(newPlaylist);
  saveUserPlaylists(playlists);
  return newPlaylist;
}

export const deletePlaylist = (playlistId) => {
  const playlists = getUserPlaylists();
  const updatedPlaylists = playlists.filter((p) => p.id !== playlistId);
  saveUserPlaylists(updatedPlaylists);
};
