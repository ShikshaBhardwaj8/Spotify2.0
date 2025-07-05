# Spotify 2.0 Clone - Music Streaming App

A comprehensive music streaming application built with React, featuring a modern UI inspired by Spotify with enhanced functionality.

## 🎵 Features

### Core Features

- **🎵 Music Playlists**: Create, edit, delete, and view playlists with add/remove songs functionality
- **💿 Albums**: Browse albums, view album details, and play tracks
- **🔍 Search Functionality**: Search songs, artists, albums, and genres with real-time results
- **🎼 Genre Filter**: View all available genres and filter songs accordingly
- **🎮 Player Controls**: Play, pause, skip, shuffle, repeat, and volume controls with progress bar
- **👤 User Authentication**: JWT-based authentication with signup/login functionality
- **📱 Responsive Design**: Mobile-friendly design that works on all devices
- **🌐 Global State Management**: React Context for managing player state and user session
- **🎧 Music Streaming**: Stream audio files with progress bar and seek control
- **🔧 RESTful API**: Comprehensive backend API for all features

### Advanced Features

- **🎨 Modern UI**: Spotify-inspired design with smooth animations and transitions
- **🎯 Interactive Elements**: Hover effects, loading states, and responsive interactions
- **📊 Real-time Updates**: Live progress tracking and state management
- **🔒 Protected Routes**: Authentication-based route protection
- **📝 Form Validation**: Client-side validation with error handling
- **🎪 Mock Data**: Comprehensive sample data for testing all features

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd week5_musicPlayer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Top navigation bar
│   ├── Sidebar.jsx     # Left sidebar navigation
│   ├── EnhancedPlayerControls.jsx  # Music player controls
│   ├── LoginForm.jsx   # User login form
│   ├── SignupForm.jsx  # User registration form
│   └── PlaylistManager.jsx  # Playlist management
├── pages/              # Page components
│   ├── Home.jsx        # Home page with featured content
│   ├── Search.jsx      # Search functionality
│   ├── PlaylistPage.jsx # Individual playlist view
│   ├── AlbumPage.jsx   # Album details page
│   └── GenrePage.jsx   # Genre-specific content
├── context/            # React Context providers
│   ├── AuthContext.jsx # Authentication state management
│   └── PlayerContext.jsx # Music player state management
├── services/           # API services
│   └── api.js         # HTTP client and API endpoints
├── data/              # Mock data and utilities
│   └── mockData.js    # Sample data for testing
├── App.jsx            # Main application component
├── App.css            # Global styles
└── main.jsx           # Application entry point
```

## 🎨 Design System

### Color Palette

- **Primary Green**: `#1DB954` (Spotify Green)
- **Dark Green**: `#1ed760`
- **Black**: `#121212`
- **Dark Gray**: `#181818`
- **Gray**: `#282828`
- **Light Gray**: `#b3b3b3`
- **White**: `#ffffff`

### Typography

- **Font Family**: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif
- **Primary Text**: `#e5e5e5`
- **Secondary Text**: `#b3b3b3`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:3001/api
```

### API Configuration

The app is configured to work with a RESTful API. See `API_DOCUMENTATION.md` for detailed endpoint documentation.

## 🎮 Usage Guide

### Authentication

1. **Sign Up**: Create a new account with username, email, and password
2. **Login**: Use your credentials to access the app
3. **Logout**: Click the logout button in the navbar

### Music Player

- **Play/Pause**: Click the play button in the player controls
- **Skip**: Use the previous/next buttons
- **Shuffle**: Toggle shuffle mode
- **Repeat**: Cycle through repeat modes (none, all, one)
- **Volume**: Adjust volume using the volume slider
- **Seek**: Click on the progress bar to jump to a specific time

### Playlists

1. **Create Playlist**: Navigate to "My Playlists" and click "Create Playlist"
2. **Add Songs**: Select songs from the song selector
3. **Edit Playlist**: Click the edit button on any playlist
4. **Delete Playlist**: Click the delete button (requires confirmation)

### Search

- **Global Search**: Search across all content types
- **Filter Results**: Use the search filters for specific content
- **Real-time Results**: See results as you type

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Adding New Features

1. **Create Components**: Add new components in `src/components/`
2. **Add Pages**: Create new pages in `src/pages/`
3. **Update Routes**: Add new routes in `src/App.jsx`
4. **Add Styles**: Update `src/App.css` with new styles
5. **Update API**: Add new endpoints in `src/services/api.js`

### State Management

The app uses React Context for global state management:

- **AuthContext**: Manages user authentication state
- **PlayerContext**: Manages music player state and controls

### Styling

The app uses CSS custom properties for consistent theming. All styles are in `src/App.css` with responsive design considerations.

## 📱 Responsive Design

The app is fully responsive and works on:

- **Desktop**: Full feature set with sidebar navigation
- **Tablet**: Optimized layout with touch-friendly controls
- **Mobile**: Mobile-first design with collapsible sidebar

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Authentication-required pages
- **Input Validation**: Client-side form validation
- **Error Handling**: Comprehensive error handling and user feedback

## 🧪 Testing

The app includes comprehensive mock data for testing all features:

- **Songs**: 10 sample songs with metadata
- **Albums**: 8 sample albums
- **Playlists**: 6 sample playlists
- **Genres**: 6 music genres
- **Users**: 2 sample users

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Spotify**: Design inspiration and UI patterns
- **React Icons**: Icon library
- **Vite**: Build tool and development server
- **React Router**: Client-side routing

## 📞 Support

For support and questions:

- Create an issue in the repository
- Check the API documentation in `API_DOCUMENTATION.md`
- Review the component documentation in the code

---

**Enjoy your music! 🎵**
