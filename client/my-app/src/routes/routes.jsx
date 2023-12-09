// layouts
import DefaultLayout from "../components/layouts/DefaultLayout/DefaultLayout";
// pages
import Home from "../pages/clients/Home";
import Blog from "../pages/clients/Blog";
import NotFound from "../pages/notfound/NotFound";
import ProductDetail from "../pages/clients/ProductDetail";
import Login from "../pages/clients/Login";
import VerifyEmail from "../pages/clients/VerifyEmail";
import Account from "../pages/clients/Account";
import ResetPassword from "../pages/clients/ResetPassword";
import ProductCategory from "../pages/clients/ProductCategory";

const publicRouter = [
  {
    path: "/",
    layout: DefaultLayout,
    element: Home,
  },
  {
    path: "*",
    layout: DefaultLayout,
    element: NotFound,
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
    path: "/reset-password/:token",
    layout: null,
    element: ResetPassword,
  },
  {
    path: "/account",
    layout: DefaultLayout,
    element: Account,
  },
  // {
  //   path: "/products",
  //   layout: DefaultLayout,
  //   element: Products,
  // },
  {
    path: "/product/:pid",
    layout: DefaultLayout,
    element: ProductDetail,
  },
  {
    path: "/collections/:cid",
    layout: DefaultLayout,
    element: ProductCategory,
  },
  {
    path: "/blogs",
    layout: DefaultLayout,
    element: Blog,
  },
];

export { publicRouter };
