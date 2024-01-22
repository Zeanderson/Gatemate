import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import Home from './routes/Home'
import FieldPage from './routes/FieldPage'
import ErrorPage from './routes/ErrorPage'

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/field",
    Component: FieldPage,
  },
  {
    path: "*",
    Component: ErrorPage,
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
