import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import LinkPage from './pages/LinkPage';
import ProtectedPage from './pages/ProtectedPage';
import DashboardPage from './pages/DashboardPage';
import RedirectLinkPage from './pages/RedirectLinkPage';

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
          path: '/:id',
          element: <RedirectLinkPage />,
        },
        {
          element: <ProtectedPage />,
          children: [
            {
              path: '/dashboard',
              element: <DashboardPage />,
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
