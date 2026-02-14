# HowFastWhere.com

**Speed and Position**

[![Netlify Status](https://api.netlify.com/api/v1/badges/233df69e-9599-4408-ae8f-038afbcc9a75/deploy-status)](https://app.netlify.com/sites/howfastwhere/deploys)

This mobile-first web app uses browser geolocation to show your speed and position in real-time.

I made it on a train ride from London to Cornwall in the summer of 2023 to see where I was and how fast I was going.

Visit [https://howfastwhere.com](https://howfastwhere.com)

## 🎨 Mobile-First Redesign

This project has been redesigned using modern web technologies:
- **TypeScript** - Type-safe development
- **React 18** - Modern UI framework
- **Ark UI** - Accessible, headless UI primitives
- **Panda CSS** - Type-safe, zero-runtime CSS-in-JS
- **Vite** - Fast build tooling
- **Vitest** - Fast unit testing

### ✨ Features

- 📱 **Mobile-First Design** - Optimized for touch interfaces
- 🎯 **Real-time Tracking** - Live speed and position updates
- 🗺️ **Interactive Map** - Powered by Leaflet
- ♿ **Accessible** - WCAG 2.1 AA compliant
- 🚀 **Progressive Web App** - Install on your home screen
- 🌓 **Modern UI** - Clean, responsive design with ParkUI

### 🚀 Getting Started

#### Prerequisites
- Node.js 18+ 
- npm or yarn

#### Installation

```bash
# Install dependencies
npm install

# Generate Panda CSS styles
npm run prepare

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

#### Build for Production

```bash
# Build the app
npm run build

# Preview production build
npm run preview
```

### 📂 Project Structure

```
speed-and-position/
├── src/                    # React application source (TypeScript)
│   ├── test/              # Test files
│   │   ├── App.test.tsx  # App component tests
│   │   └── setup.ts      # Test setup and mocks
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets
│   ├── images/           # Icons and images
│   └── manifest.json     # PWA manifest
├── styled-system/        # Generated Panda CSS (git-ignored)
├── index.ts               # Legacy TypeScript file
├── panda.config.ts       # Panda CSS configuration
├── vite.config.js        # Vite configuration
├── vitest.config.ts      # Vitest test configuration
├── tsconfig.json         # TypeScript configuration
├── index.html            # React app entry point
├── index-legacy.html     # Original version
├── REDESIGN_PLAN.md      # Detailed redesign documentation
└── package.json          # Dependencies and scripts
```

### 🔧 Development

#### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint on TypeScript files
- `npm test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report
- `npm run panda` - Generate Panda CSS utilities
- `npm run serve` - Serve original HTML (legacy)

#### Legacy Version

The original vanilla JavaScript version is preserved in `index-legacy.html` and can be served with:

```bash
npm run serve
```

### 📋 Redesign Plan

See [REDESIGN_PLAN.md](./REDESIGN_PLAN.md) for the complete mobile-first redesign strategy, including:
- Architecture decisions
- Component structure
- Mobile-first design principles
- Implementation phases
- Testing strategy
- Future enhancements

### 🎯 Mobile-First Approach

The redesign follows these principles:

1. **Touch-First** - All interactions optimized for touch screens
2. **Thumb-Friendly** - Critical actions within thumb reach
3. **Progressive Enhancement** - Works on all devices, enhanced on larger screens
4. **Performance** - Fast loading, minimal JavaScript
5. **Responsive** - Fluid layouts that adapt to screen size

### 🛠️ Technology Stack

- **Language**: TypeScript 5.5+
- **Frontend Framework**: React 18
- **UI Components**: Ark UI primitives
- **Styling**: Panda CSS (type-safe CSS-in-JS)
- **Build Tool**: Vite 5
- **Testing**: Vitest + React Testing Library
- **Maps**: React-Leaflet (planned)
- **Geolocation**: Browser Geolocation API
- **Linting**: ESLint 9 with TypeScript support
- **PWA**: Service Worker (planned)

### 📱 Browser Support

- iOS Safari 14+
- Chrome Android 90+
- Chrome Desktop 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### 📄 License

MIT

### 👤 Author

**Ivan Storck**
- Website: [ivanstorck.com](https://www.ivanstorck.com)

---

Made with ♥ using ParkUI

