import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DashboardPage from './pages/DashboardPage';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import { selectUser } from './features/auth/authSlice';
import { loadProfile } from './features/profile/profileSlice';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    // If user exists, load their profile data
    if (user) {
      dispatch(loadProfile());
    }
  }, [dispatch, user]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" replace /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/dashboard" replace /> : <Signup />}
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
