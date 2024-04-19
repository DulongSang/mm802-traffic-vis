import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Dashboard } from './routes/Dashboard';
import { IntersectionCamera } from './routes/IntersectionCamera';
import { IntersectionDashboard } from './routes/IntersectionDashboard';
import { MapView } from './routes/MapView';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MapView />,
  },
  {
    path: "/map-view",
    element: <MapView />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/intersection/camera/:id",
    element: <IntersectionCamera />,
  },
  {
    path: "/intersection/dashboard/:id",
    element: <IntersectionDashboard />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
