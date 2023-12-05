// layouts
import DefaultLayout from "../components/layouts/DefaultLayout/DefaultLayout";
// pages
import Home from "../pages/clients/Home";
import Product from "../pages/clients/Product";
import Blog from "../pages/clients/Blog";
import NotFound from "../pages/notfound/NotFound";
import ProductDetail from "../pages/clients/ProductDetail";
import Login from "../pages/clients/Login";
import VerifyEmail from "../pages/clients/VerifyEmail";
import Account from "../pages/clients/Account";

const publicRouter = [
  {
    path: "/",
    layout: DefaultLayout,
    element: Home,
  },
  {
    path: "/login",
    layout: null,
    element: Login,
  },
  {
    path: "/verifyemail",
    layout: null,
    element: VerifyEmail,
  },
  {
    path: "/account",
    layout: DefaultLayout,
    element: Account,
  },
  {
    path: "/products",
    layout: DefaultLayout,
    element: Product,
  },
  {
    path: "/product/:pid",
    layout: DefaultLayout,
    element: ProductDetail,
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
