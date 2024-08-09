import { createBrowserRouter } from "react-router-dom";
import VirtualList from "../pages/virtualList";
import App from "../App";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "virtual_list",
        title: "Virtual List",
        element: <VirtualList />,
      },
    ],
  },
];

export default createBrowserRouter(routes);
