// layouts
import DefaultLayout from "../components/layouts/DefaultLayout/DefaultLayout";
// pages
import Home from "../pages/clients/Home";
import Product from "../pages/clients/Product";
import Blog from "../pages/clients/Blog";
import NotFound from "../pages/notfound/NotFound";

const publicRouter = [
  {
    path: "/",
    layout: DefaultLayout,
    element: Home,
  },
  {
    path: "/products",
    layout: DefaultLayout,
    element: Product,
  },
  {
    path: "/blogs",
    layout: DefaultLayout,
    element: Blog,
  },
  {
    path: "*",
    layout: DefaultLayout,
    element: NotFound,
  },
];

export { publicRouter };
