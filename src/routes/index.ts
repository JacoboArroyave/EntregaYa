import { Component } from "lucide-react";
import { lazy } from "react";


const ListRestaurant = lazy(() => import('../pages/RestaurantList'));
const ListDriver = lazy(() => import('../pages/DriverList'));
const ListMenu = lazy(() => import('../pages/MenuList'));
const ListMotorcycle = lazy(() => import('../pages/MotorcycleList'));
const ListProduct = lazy(() => import('../pages/ProductList'));
const ListAddress = lazy(() => import('../pages/ListAddress'));
const CreateAdress = lazy(() => import('../pages/AddressCreate'));
const createRestaurant = lazy(() => import('../pages/RestaurantsCreate'));
const DashChart = lazy(() => import('../pages/DashChart'));
const RestaurantList = lazy(() => import('../pages/ListRestaurant'));
const ProductCards = lazy(() => import('../pages/ProductCards'));

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
    path: '/products/:id',
    title: 'Restaurant List',
    component: ProductCards,
  },
  {
    path: '/',
    title: 'Restaurant',
    component: RestaurantList,
  },
  {
    path: '/list-driver',
    title: 'Driver List',
    component: ListDriver,
  },
  {
    path: '/addresses',
    title: 'Addresses lIst',
    component: ListAddress,
  },
  {
    path: '/list-menu',
    title: 'Menu List',
    component: ListMenu,
  },
  {
    path: '/charts',
    title: 'Dash Chart',
    component: DashChart,
  },
  {
    path: '/address/create',
    title: 'Crear Dirreccion formulario',
    component: CreateAdress,
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
  {
    path:"/create-restaurant",
    title: "Create Restaurant",
    component:createRestaurant,
  },
];

const routes = [...coreRoutes];

export default routes;