import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Context and auth route protection
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Lessons from './pages/Lessons';
import Landing from './pages/Landing';
import Quiz from './pages/Quiz';
import Rewards from './pages/Rewards';
import Wallet from './pages/Wallet';

import Loading from './components/Loading';

// Route definitions
const routeList = [
  { path: '/', element: <Login />, protected: false },
  { path: '/login', element: <Login />, protected: false },
  { path: '/register', element: <Register />, protected: false },
  { path: '/dashboard', element: <Dashboard />, protected: true },
  { path: '/lessons', element: <Lessons />, protected: true },
  { path: '/quiz', element: <Quiz />, protected: true },
  { path: '/rewards', element: <Rewards />, protected: true },
  { path: '/wallet', element: <Wallet />, protected: true },
];

function App() {
  return (
    <AuthProvider>
      <Routes>
        {routeList.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              route.protected ? (
                <ProtectedRoute>{route.element}</ProtectedRoute>
              ) : (
                route.element
              )
            }
          />
        ))}
        {/* Optional fallback loading route */}
        <Route path="*" element={<Loading />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
