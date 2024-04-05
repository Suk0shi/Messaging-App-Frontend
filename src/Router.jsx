import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Chat from "./pages/Chat";
// import ErrorPage from "./ErrorPage";

const Router = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "/SignUp",
      element: <SignUp />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "/chat",
      element: <Chat />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;