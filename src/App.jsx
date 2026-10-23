import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { Layout } from '@/components/layout/Layout';
import Home from '@/pages/Home';

const Features = lazy(() => import('@/pages/Features'));
const Pricing = lazy(() => import('@/pages/Pricing'));
const Audience = lazy(() => import('@/pages/Audience'));
const Contact = lazy(() => import('@/pages/Contact'));
const Legal = lazy(() => import('@/pages/Legal'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/fonctionnalites', element: <Features /> },
      { path: '/tarifs', element: <Pricing /> },
      { path: '/proprietaires', element: <Audience kind="proprietaires" /> },
      { path: '/locataires', element: <Audience kind="locataires" /> },
      { path: '/contact', element: <Contact /> },
      { path: '/mentions-legales', element: <Legal kind="mentions" /> },
      { path: '/confidentialite', element: <Legal kind="confidentialite" /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  );
}
