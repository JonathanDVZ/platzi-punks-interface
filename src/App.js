import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/home";
import MainLayout from "./layouts/main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    exact: true,
  },
]);

function App() {
  return (
    <MainLayout>
      <RouterProvider router={router} />
    </MainLayout>
  );
}

export default App;
