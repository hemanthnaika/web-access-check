import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from "./layout/Layout";
import Home from "./pages/home";
import Check from "./pages/check";
import Services from "./pages/services";
import Contact from "./pages/Contact";
import About from "./pages/about";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/check",
        element: <Check />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
