# Qarar Dashboard

A modern React dashboard application with authentication, profile management, notifications, and task management capabilities.

## Features

- 🔐 User Authentication (Login/Signup)
- 👤 User Profile Management
- 📊 Interactive Dashboard Cards
- 🔔 Real-time Notifications System
- ✅ Drag-and-Drop Task Management
- 📱 Responsive Design

## Tech Stack

- React 18 with Vite
- Redux Toolkit for state management
- React Router v6 for routing
- Formik & Yup for form validation
- TailwindCSS for styling
- React Testing Library for testing
- date-fns for date formatting
- @dnd-kit for drag-and-drop functionality

## Setup Instructions

1. Clone the repository:
```bash
git clone [repository-url]
cd qarar-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
npm run preview
```

## Testing

```bash
npm run test
```

## Project Structure

```
src/
├── app/
│   └── store.js          # Redux store configuration
├── components/
│   ├── Auth/             # Login and Signup components
│   ├── Dashboard/        # Dashboard UI components
│   ├── Profile/          # User profile management
│   ├── Notifications/    # Notifications system
│   └── Tasks/            # Task management
├── features/             # Redux slices and business logic
├── pages/               # Route components
└── __tests__/          # Test files
```

## Approach & Implementation

### Architecture
- Used Redux Toolkit for state management with separate slices for auth, tasks, notifications, and profile
- Implemented protected routes with React Router
- Used Formik for form management and Yup for validation
- Leveraged TailwindCSS for responsive design

### Authentication Flow
- Local storage based authentication
- Form validation with helpful error messages
- Protected routes redirect to login
- Persistent user sessions

### Data Persistence
- User data stored in localStorage
- Tasks and notifications persist across sessions
- Profile changes are saved immediately

## Design Decisions & Trade-offs

### Local Storage vs. Backend
- Used localStorage for data persistence to keep the demo self-contained
- In a production environment, would integrate with a backend API

### Form Validation
- Client-side validation using Formik & Yup
- Trade-off: No server-side validation in this demo version

### State Management
- Used Redux for global state management
- Trade-off: Might be overkill for a small app, but demonstrates scalability

### UI/UX Decisions
- Focused on responsive design
- Used Tailwind for rapid development
- Implemented loading states and error handling
- Added subtle animations for better user experience

## Future Improvements

1. Backend Integration
   - Replace localStorage with API calls
   - Add proper authentication with JWT
   - Implement real-time updates

2. Additional Features
   - Password reset functionality
   - Email verification
   - Advanced task filtering
   - More dashboard widgets

3. Performance Optimizations
   - Implement code splitting
   - Add service worker for offline support
   - Optimize bundle size

## Notes

- The application uses Vite for faster development experience
- All components are tested using React Testing Library
- The project follows modern React best practices
- Code is documented with JSDoc comments
"# mini-dashboardassesmnet" 
