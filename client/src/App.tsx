import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EditPage from "./pages/EditPage";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import SongDetailsPage from "./pages/SongDetailsPage";


import DefaultLayout from "./containers/DefaultLayout";
import { ReduxProvider } from "./containers/ReduxProvider";
import StatPage from "./pages/StatisticsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "edit/:id",
        element: <EditPage />,
      },
      {
        path: "create",
        element: <CreatePage />,
      },
      {
        path: "song/:id",
        element: <SongDetailsPage />,
      },
      {
        path: "/statistics",
        element: <StatPage />,
      },
    ],
  },
]);
const App = () => {
  return (
    <ReduxProvider>
      <RouterProvider router={router}></RouterProvider>;
      <ToastContainer />
    </ReduxProvider>
  );
};

export default App;
