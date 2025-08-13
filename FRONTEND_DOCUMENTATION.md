# IMS Frontend Documentation

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Components](#components)
- [Pages](#pages)
- [Authentication & Authorization](#authentication--authorization)
- [State Management](#state-management)
- [Styling](#styling)
- [API Integration](#api-integration)
- [Routing](#routing)
- [Development](#development)

## 🎯 Overview

The IMS (Inventory Management System) frontend is a modern React application built with Vite, featuring a responsive design and role-based access control. The application provides an intuitive interface for managing inventory, viewing analytics, and controlling user access based on roles.

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: JavaScript (JSX)
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Charts**: Chart.js with react-chartjs-2
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Notifications**: React Hot Toast
- **UI Components**: Headless UI
- **Font**: Outfit (Google Fonts)

## 📁 Project Structure

```
IMS-Frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── AddProduct.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EditProduct.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Products.jsx
│   │   └── Reports.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## ✨ Key Features

### 🎨 User Interface

- **Modern Design**: Clean, professional interface with gradient backgrounds
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Theme**: Consistent color scheme throughout
- **Custom Font**: Outfit font for better readability

### 🔐 Authentication & Authorization

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Admin and User roles with different permissions
- **Protected Routes**: Automatic redirection for unauthorized access
- **Session Management**: Persistent login state

### 📊 Analytics & Reports

- **Real-time Dashboard**: Live statistics and metrics
- **Interactive Charts**: Bar charts, pie charts, and line charts
- **Auto-refresh**: Configurable data refresh intervals
- **Data Visualization**: Comprehensive inventory insights

### 🛍️ Product Management

- **CRUD Operations**: Create, Read, Update, Delete products
- **Search & Filter**: Advanced product filtering capabilities
- **Bulk Operations**: Efficient management of multiple products
- **Status Tracking**: Real-time stock status updates

## 🧩 Components

### Core Components

#### `Navbar.jsx`

- **Purpose**: Top navigation bar with user info and logout
- **Features**:
  - User profile display
  - Logout functionality
  - Mobile menu toggle
  - Responsive design

#### `Sidebar.jsx`

- **Purpose**: Left sidebar navigation
- **Features**:
  - Role-based menu filtering
  - Active page highlighting
  - Mobile responsive
  - Collapsible design

#### `AuthContext.jsx`

- **Purpose**: Global authentication state management
- **Features**:
  - User login/logout
  - Permission checking
  - Token management
  - Role-based access control

## 📄 Pages

### Public Pages

#### `Home.jsx` (Landing Page)

- **Route**: `/`
- **Purpose**: Marketing landing page
- **Features**:
  - Hero section with call-to-action
  - Feature highlights
  - Statistics showcase
  - Professional footer
  - Navigation to login

#### `Login.jsx`

- **Route**: `/login`
- **Purpose**: User authentication
- **Features**:
  - Username/password login
  - Role selection (Admin/User)
  - Demo credentials
  - Form validation
  - Error handling

### Protected Pages

#### `Dashboard.jsx`

- **Route**: `/dashboard`
- **Purpose**: Main application dashboard
- **Features**:
  - Key metrics display
  - Quick actions (Admin only)
  - Recent activity
  - Role-specific content

#### `Products.jsx`

- **Route**: `/products`
- **Purpose**: Product listing and management
- **Features**:
  - Product grid/list view
  - Search and filtering
  - Edit/Delete actions (Admin only)
  - Status indicators

#### `AddProduct.jsx`

- **Route**: `/products/add`
- **Purpose**: Create new products
- **Access**: Admin only
- **Features**:
  - Comprehensive product form
  - Image upload
  - Category selection
  - Validation

#### `EditProduct.jsx`

- **Route**: `/products/edit/:id`
- **Purpose**: Modify existing products
- **Access**: Admin only
- **Features**:
  - Pre-populated form
  - Update functionality
  - Validation

#### `Reports.jsx`

- **Route**: `/reports`
- **Purpose**: Analytics and insights
- **Features**:
  - Interactive charts
  - Real-time data
  - Auto-refresh
  - Export functionality (removed)

#### `About.jsx`

- **Route**: `/about`
- **Purpose**: System information
- **Features**:
  - Project details
  - Technology stack
  - Contact information

## 🔐 Authentication & Authorization

### User Roles

#### Admin Role

- **Credentials**: `admin` / `admin123`
- **Permissions**:
  - View dashboard
  - View products
  - Create products
  - Edit products
  - Delete products
  - View reports
  - View about

#### User Role

- **Credentials**: `user` / `user123`
- **Permissions**:
  - View dashboard
  - View products
  - View reports
  - View about

### Permission System

```javascript
const permissions = {
  ADMIN: [
    "view_dashboard",
    "view_products",
    "create_products",
    "edit_products",
    "delete_products",
    "view_reports",
    "view_about",
  ],
  USER: ["view_dashboard", "view_products", "view_reports", "view_about"],
};
```

## 🗃️ State Management

### Context API

- **AuthContext**: Manages authentication state
- **Global State**: User data, permissions, loading states

### Local State

- **Component State**: Form data, UI states, loading indicators
- **React Hooks**: useState, useEffect, useCallback

## 🎨 Styling

### Tailwind CSS

- **Utility-First**: Rapid UI development
- **Responsive**: Mobile-first approach
- **Custom Configuration**: Extended theme and colors

### Design System

- **Color Palette**: Blue and indigo gradients
- **Typography**: Outfit font family
- **Spacing**: Consistent spacing scale
- **Components**: Reusable UI patterns

## 🔌 API Integration

### Axios Configuration

- **Base URL**: Configured for backend API
- **Interceptors**: Automatic token handling
- **Error Handling**: Centralized error management

### API Endpoints

- **Authentication**: `/api/auth/login`
- **Products**: `/api/products`
- **Reports**: `/api/reports` (removed)

## 🛣️ Routing

### Route Structure

```javascript
// Public routes
/ → Home page
/login → Login page

// Protected routes
/dashboard → Dashboard
/products → Products list
/products/add → Add product (Admin only)
/products/edit/:id → Edit product (Admin only)
/reports → Reports
/about → About page
```

### Route Protection

- **ProtectedRoute**: Wraps authenticated pages
- **PermissionRoute**: Role-based access control
- **Automatic Redirects**: Unauthorized access handling

## 🚀 Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
cd IMS-Frontend
npm install
```

### Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

### Environment Variables

- `VITE_API_URL`: Backend API URL (default: http://localhost:8080)

## 🔧 Configuration Files

### `vite.config.js`

- Vite build configuration
- Proxy settings for API calls
- Build optimizations

### `tailwind.config.js`

- Tailwind CSS configuration
- Custom theme extensions
- Font family settings

### `package.json`

- Dependencies and scripts
- Project metadata
- Build configurations

## 🧪 Testing

### Manual Testing

- Cross-browser compatibility
- Responsive design testing
- Role-based access testing
- Form validation testing

### Performance

- Bundle size optimization
- Lazy loading implementation
- Image optimization
- Code splitting

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend is running and CORS is configured
2. **Authentication Issues**: Check token storage and API endpoints
3. **Build Errors**: Verify Node.js version and dependencies
4. **Styling Issues**: Check Tailwind CSS configuration

### Debug Tools

- React Developer Tools
- Browser Developer Tools
- Network tab for API calls
- Console for error messages

## 📈 Future Enhancements

### Planned Features

- **Real-time Updates**: WebSocket integration
- **Offline Support**: Service worker implementation
- **Advanced Filtering**: More sophisticated search options
- **Bulk Operations**: Multi-select functionality
- **Data Export**: CSV/Excel export (removed but can be re-added)

### Performance Improvements

- **Code Splitting**: Route-based lazy loading
- **Caching**: API response caching
- **Optimization**: Bundle size reduction
- **PWA**: Progressive Web App features

## 📞 Support

For technical support or questions about the frontend implementation, refer to:

- React documentation
- Tailwind CSS documentation
- Vite documentation
- Project README files

---

**Last Updated**: January 2024
**Version**: 1.0.0
