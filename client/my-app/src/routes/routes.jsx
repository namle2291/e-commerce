// layouts
import DefaultLayout from '../components/layouts/DefaultLayout/DefaultLayout';
// pages
import Home from '../pages/clients/Home';
import Blog from '../pages/clients/Blog';
import NotFound from '../pages/notfound/NotFound';
import ProductDetail from '../pages/clients/ProductDetail';
import Login from '../pages/clients/Login';
import VerifyEmail from '../pages/clients/VerifyEmail';
import Member from '../pages/clients/Member';
import ResetPassword from '../pages/clients/ResetPassword';
import ProductCategory from '../pages/clients/ProductCategory';
import CategoryManager from '../pages/admin/Category/CategoryManager';
import ProductManager from '../pages/admin/Product/ProductManager';
import AddProduct from '../pages/admin/Product/AddProduct';
import ProductDeleted from '../pages/admin/Product/ProductDeleted';
import OrderManager from '../pages/admin/OrderManager';
import UserManager from '../pages/admin/UserManager';
import Dashboard from '../pages/admin/Dashboard';
import UpdateProduct from '../pages/admin/Product/UpdateProduct';
import Cart from '../pages/clients/Cart';
import { MemberLayout } from 'components/layouts/MemberLayout/MemberLayout';

const publicRouter = [
   {
      path: '/',
      layout: DefaultLayout,
      element: Home,
   },
   {
      path: '*',
      layout: DefaultLayout,
      element: NotFound,
   },
   {
      path: '/login',
      layout: null,
      element: Login,
   },
   {
      path: '/verifyemail',
      layout: null,
      element: VerifyEmail,
   },
   {
      path: '/reset-password/:token',
      layout: null,
      element: ResetPassword,
   },
   {
      path: '/cart',
      layout: DefaultLayout,
      element: Cart,
   },
   {
      path: '/product/:pid',
      layout: DefaultLayout,
      element: ProductDetail,
   },
   {
      path: '/collections/:cid',
      layout: DefaultLayout,
      element: ProductCategory,
   },
   {
      path: '/blogs',
      layout: DefaultLayout,
      element: Blog,
   },
];

const privateRouter = [
   {
      path: '/dashboard',
      element: Dashboard,
   },
   {
      path: '/categories',
      element: CategoryManager,
   },
   {
      path: '/orders',
      element: OrderManager,
   },
   {
      path: '/users',
      element: UserManager,
   },
   {
      path: '/products',
      element: ProductManager,
   },
   {
      path: '/products/add',
      element: AddProduct,
   },
   {
      path: '/products/trash',
      element: ProductDeleted,
   },
   {
      path: '/products/:pid',
      element: UpdateProduct,
   },
   {
      path: '*',
      element: NotFound,
   },
];

export { publicRouter, privateRouter };
