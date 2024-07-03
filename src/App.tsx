import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
import LinkPage from './pages/LinkPage';
import ProtectedPage from './pages/ProtectedPage';

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: '/auth',
          element: <AuthPage />,
        },
        {
          path: '/',
          element: <LandingPage />,
        },
        {
          element: <ProtectedPage />,
          children: [
            {
              path: '/dashboard',
              element: <Dashboard />,
            },
            {
              path: '/link/:id',
              element: <LinkPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
