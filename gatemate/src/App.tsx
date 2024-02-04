import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./routes/Home";
import FieldPage from "./routes/FieldPage";
import ErrorPage from "./routes/ErrorPage";
import Signin from "./routes/SignIn";
import Register from "./routes/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Signin,
  },
  {
    path: "/signup",
    Component: Register,
  },
  {
    path: "/home",
    Component: Home,
  },
  {
    path: "/field",
    Component: FieldPage,
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
