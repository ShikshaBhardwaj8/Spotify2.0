import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  signup: (userData) => api.post("/auth/signup", userData),
  verify: () => api.get("/auth/verify"),
  logout: () => api.post("/auth/logout"),
};

// Songs API
export const songsAPI = {
  getAll: (params) => api.get("/songs", { params }),
  getById: (id) => api.get(`/songs/${id}`),
  search: (query) => api.get("/songs/search", { params: { q: query } }),
  getByGenre: (genreId) => api.get(`/songs/genre/${genreId}`),
  getByAlbum: (albumId) => api.get(`/songs/album/${albumId}`),
  getByPlaylist: (playlistId) => api.get(`/songs/playlist/${playlistId}`),
  addToPlaylist: (playlistId, songId) =>
    api.post(`/playlists/${playlistId}/songs`, { songId }),
  removeFromPlaylist: (playlistId, songId) =>
    api.delete(`/playlists/${playlistId}/songs/${songId}`),
};

// Albums API
export const albumsAPI = {
  getAll: (params) => api.get("/albums", { params }),
  getById: (id) => api.get(`/albums/${id}`),
  search: (query) => api.get("/albums/search", { params: { q: query } }),
  getByGenre: (genreId) => api.get(`/albums/genre/${genreId}`),
  getByArtist: (artistId) => api.get(`/albums/artist/${artistId}`),
};

// Playlists API
export const playlistsAPI = {
  getAll: (params) => api.get("/playlists", { params }),
  getById: (id) => api.get(`/playlists/${id}`),
  create: (playlistData) => api.post("/playlists", playlistData),
  update: (id, playlistData) => api.put(`/playlists/${id}`, playlistData),
  delete: (id) => api.delete(`/playlists/${id}`),
  getUserPlaylists: (userId) => api.get(`/users/${userId}/playlists`),
  addSong: (playlistId, songId) =>
    api.post(`/playlists/${playlistId}/songs`, { songId }),
  removeSong: (playlistId, songId) =>
    api.delete(`/playlists/${playlistId}/songs/${songId}`),
};

// Genres API
export const genresAPI = {
  getAll: () => api.get("/genres"),
  getById: (id) => api.get(`/genres/${id}`),
  getSongs: (id) => api.get(`/genres/${id}/songs`),
  getAlbums: (id) => api.get(`/genres/${id}/albums`),
};

// Users API
export const usersAPI = {
  getProfile: () => api.get("/users/profile"),
  updateProfile: (userData) => api.put("/users/profile", userData),
  getFavorites: () => api.get("/users/favorites"),
  addToFavorites: (type, id) => api.post("/users/favorites", { type, id }),
  removeFromFavorites: (type, id) =>
    api.delete(`/users/favorites/${type}/${id}`),
  getPlaylists: () => api.get("/users/playlists"),
};

// Search API
export const searchAPI = {
  global: (query, filters = {}) =>
    api.get("/search", { params: { q: query, ...filters } }),
  songs: (query) => api.get("/search/songs", { params: { q: query } }),
  albums: (query) => api.get("/search/albums", { params: { q: query } }),
  playlists: (query) => api.get("/search/playlists", { params: { q: query } }),
  artists: (query) => api.get("/search/artists", { params: { q: query } }),
};

// Jamendo API Integration
const JAMENDO_CLIENT_ID = import.meta.env.VITE_JAMENDO_CLIENT_ID || "a0153c9e";
const JAMENDO_API_URL = "https://api.jamendo.com/v3.0";

export const jamendoAPI = {
  search: (query) => {
    return axios.get(`${JAMENDO_API_URL}/tracks/`, {
      params: {
        client_id: JAMENDO_CLIENT_ID,
        format: "json",
        limit: 50,
        search: query,
        imagesize: 400,
      },
    });
  },
  getTracks: (params) => {
    return axios.get(`${JAMENDO_API_URL}/tracks/`, {
      params: {
        client_id: JAMENDO_CLIENT_ID,
        format: "json",
        ...params,
      },
    });
  },
  getAlbums: (params) => {
    return axios.get(`${JAMENDO_API_URL}/albums/`, {
      params: {
        client_id: JAMENDO_CLIENT_ID,
        format: "json",
        ...params,
      },
    });
  },
};

// Error handling utility
export const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    switch (status) {
      case 400:
        return { error: data.message || "Bad request" };
      case 401:
        return { error: "Unauthorized. Please login again." };
      case 403:
        return { error: "Access forbidden" };
      case 404:
        return { error: "Resource not found" };
      case 500:
        return { error: "Server error. Please try again later." };
      default:
        return { error: data.message || "An error occurred" };
    }
  } else if (error.request) {
    // Network error
    return { error: "Network error. Please check your connection." };
  } else {
    // Other error
    return { error: error.message || "An unexpected error occurred" };
  }
};

export default api;
