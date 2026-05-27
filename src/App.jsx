import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Redirect from "./pages/Redirect";
import Link from "./pages/Link";
import { ThemeProvider } from "./components/theme-provider";
import LinksPage from "./pages/Links";
import Auth0callback from "./pages/Auth0callback";
import PrivateRoute from "./components/Private.route";

export default function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/dashboard",
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
        },
        {
          path: "/:id",
          element: <Redirect />,
        },
        {          path: "/links",
          element: <LinksPage />,
        },
        {
          path: "/links/:id",
          element: <Link />,
        },
        {
          path: "/auth",
          element: <Auth0callback />,
        },
      ],
    },
  ]);

  return <ThemeProvider>{<RouterProvider router={router} />}</ThemeProvider>;
}
