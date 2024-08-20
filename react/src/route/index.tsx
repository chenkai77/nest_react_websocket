import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Demo from "@/pages/demo/index.tsx";
import Room from "@/pages/room/index.tsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "demo",
        element: <Demo />,
      },
      {
        path: "room",
        element: <Room />,
      },
    ],
  },
]);

export default routes;
