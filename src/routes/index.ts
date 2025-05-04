import { lazy } from "react";

const ListRestaurant = lazy(() => import('../pages/RestaurantList'));
const ListDriver = lazy(() => import('../pages/DriverList'));
const ListMenu = lazy(() => import('../pages/MenuList'));
const ListMotorcycle = lazy(() => import('../pages/MotorcycleList'));
const ListProduct = lazy(() => import('../pages/ProductList'));
//const ListShift = lazy(() => import('../pages/ShiftList'));
//const ListIssue = lazy(() => import('../pages/IssueList'));
//const ListPhoto = lazy(() => import('../pages/PhotoList'));
//const ListCustomer = lazy(() => import('../pages/CustomerList'));
//const ListOrder = lazy(() => import('../pages/OrderList'));
//const ListAddress = lazy(() => import('../pages/AddressList'));

const coreRoutes = [
  {
    path: '/list-restaurant',
    title: 'Restaurant List',
    component: ListRestaurant,
  },
  {
    path: '/list-driver',
    title: 'Driver List',
    component: ListDriver,
  },
  {
    path: '/list-menu',
    title: 'Menu List',
    component: ListMenu,
  },
  {
    path: '/list-motorcycle',
    title: 'Motorcycle List',
    component: ListMotorcycle,
  },
  {
    path: '/list-product',
    title: 'Product List',
    component: ListProduct,
  },
];

const routes = [...coreRoutes];

export default routes;