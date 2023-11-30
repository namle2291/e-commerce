// layouts
import DefaultLayout from "../components/layouts/DefaultLayout/DefaultLayout";
import OnlyHeader from "../components/layouts/OnlyHeader/OnlyHeader";
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
    layout: OnlyHeader,
    element: Product,
  },
  {
    path: "/blogs",
    layout: OnlyHeader,
    element: Blog,
  },
  {
    path: "*",
    layout: OnlyHeader,
    element: NotFound,
  },
];

export { publicRouter };
