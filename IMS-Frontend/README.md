# IMS Frontend - React + Tailwind CSS

A modern, responsive frontend for the Inventory Management System built with React and Tailwind CSS.

## Features

- 🎨 **Modern UI/UX** - Clean, responsive design with Tailwind CSS
- 🔐 **Authentication** - Role-based access control (Admin/User)
- 📊 **Dashboard** - Real-time statistics and analytics
- 📦 **Product Management** - Add, edit, delete, and search products
- 📈 **Reports** - Comprehensive analytics and export options
- 📱 **Responsive** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast** - Built with Vite for optimal performance

## Tech Stack

- **React 19** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Headless UI** - Accessible UI components
- **Heroicons** - Beautiful SVG icons
- **Vite** - Fast build tool and dev server

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd IMS-Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Top navigation bar
│   └── Sidebar.jsx     # Side navigation menu
├── contexts/           # React contexts
│   └── AuthContext.jsx # Authentication context
├── pages/              # Page components
│   ├── Dashboard.jsx   # Main dashboard
│   ├── Products.jsx    # Product listing
│   ├── AddProduct.jsx  # Add product form
│   ├── EditProduct.jsx # Edit product form
│   ├── Reports.jsx     # Analytics and reports
│   ├── About.jsx       # About page
│   └── Login.jsx       # Login page
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles and Tailwind imports
```

## Authentication

The app includes a mock authentication system with two user types:

- **Admin** (username: `admin`, password: `admin123`)
- **User** (username: `user`, password: `user123`)

Replace the mock authentication in `AuthContext.jsx` with your actual backend API calls.

## API Integration

The frontend is configured to proxy API requests to `http://localhost:8080` (your Spring Boot backend). Update the proxy configuration in `package.json` if your backend runs on a different port.

## Customization

### Styling

- Modify `tailwind.config.js` to customize the design system
- Update `src/index.css` for global styles
- Use Tailwind utility classes for component styling

### Components

- All components are built with Tailwind CSS
- Use Headless UI for accessible, unstyled components
- Heroicons for consistent iconography

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow the existing code style
2. Use Tailwind CSS for styling
3. Ensure components are responsive
4. Test on different screen sizes

## License

This project is licensed under the MIT License.
