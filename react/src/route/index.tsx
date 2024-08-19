import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Demo from "@/pages/demo/index.tsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "demo",
        element: <Demo />,
      },
    ],
  },
]);

export default routes;
