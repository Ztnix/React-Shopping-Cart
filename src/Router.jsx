import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErrorPage";
import Home from "./Home";
import Shop from "./Shop";
import Cart from "./Cart";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/React-Shopping-Cart",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/React-Shopping-Cart/home",
          element: <Home />,
        },
        {
          path: "/React-Shopping-Cart/shop",
          element: <Shop />,
        },
        {
          path: "/React-Shopping-Cart/cart",
          element: <Cart />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
