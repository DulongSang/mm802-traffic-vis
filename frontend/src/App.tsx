import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MapView } from './routes/MapView';
import { Welcome } from './routes/Welcome';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/map-view",
    element: <MapView />,
  },
  {
    path: "/dashboard",
    element: <h1>TODO: Dashboard</h1>,
  },
  {
    path: "/intersection/:id",
    element: <h1>TODO: Intersection</h1>,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
