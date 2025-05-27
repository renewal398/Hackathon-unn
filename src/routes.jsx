// src/routes.js
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Lessons from './pages/Lessons';
import Quiz from './pages/Quiz';
import Rewards from './pages/Rewards';
import Wallet from './pages/Wallet';
import Loading from './components/Loading';

const routes = [
  {
    path: '/',
    element: <Login />,
    protected: false
  },
  {
    path: '/login',
    element: <Login />,
    protected: false
  },
  {
    path: '/register',
    element: <Register />,
    protected: false
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    protected: true
  },
  {
    path: '/lessons',
    element: <Lessons />,
    protected: true
  },
  {
    path: '/quiz',
    element: <Quiz />,
    protected: true
  },
  {
    path: '/rewards',
    element: <Rewards />,
    protected: true
  },
  {
    path: '/wallet',
    element: <Wallet />,
    protected: true
  }
];

export default routes;