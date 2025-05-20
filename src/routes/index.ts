import { Component } from "lucide-react";
import { lazy } from "react";


const ListRestaurant = lazy(() => import('../pages/List/RestaurantList'));
const ListDriver = lazy(() => import('../pages/List/DriverList'));
const ListMenu = lazy(() => import('../pages/List/MenuList'));
const ListMotorcycle = lazy(() => import('../pages/List/MotorcycleList'));
const ListProduct = lazy(() => import('../pages/List/ProductList'));
const ListAddress = lazy(() => import('../pages/List/ListAddress'));
const ListOrders = lazy(() => import('../pages/List/ListOrders'));
const CreateAdress = lazy(() => import('../pages/Create/AddressCreate'));
const ActionDriver = lazy(() => import('../pages/Create/DriverAction'));
const Order = lazy(() => import('../pages/Create/OrderAction'));
const createRestaurant = lazy(() => import('../pages/Create/RestaurantsCreate'));
const DashChart = lazy(() => import('../pages/DashChart'));
const RestaurantList = lazy(() => import('../pages/List/ListRestaurant'));
const MotorcycleAction = lazy(() => import('../pages/Create/MotorcycleAction'));
const CustomerList = lazy(() => import('../pages/List/CustomerList'));
const ProductCards = lazy(() => import('../pages/ProductCards'));
const OrderList = lazy(() => import('../pages/List/OrderList'));
const PhotoList = lazy(() => import('../pages/List/ListPhotos'));
const OrderUpdate = lazy(() => import('../pages/Update/Order'));
const MapTracking = lazy(() => import('../pages/TrackingPage'));
const AdressAction = lazy(() => import('../pages/Create/AddressAction'));
const MenuAction = lazy(() => import('../pages/Create/MenuAction'));
const ProductAction = lazy(() => import('../pages/Create/ProductAction'));

//const ListShift = lazy(() => import('../pages/ShiftList'));
//const ListIssue = lazy(() => import('../pages/IssueList'));
//const ListPhoto = lazy(() => import('../pages/PhotoList'));
//const ListCustomer = lazy(() => import('../pages/CustomerList'));
//const ListOrder = lazy(() => import('../pages/OrderList'));
//const ListAddress = lazy(() => import('../pages/AddressList'));

const coreRoutes = [
  {
    path: '/action-motorcycle',
    title: 'Motorcycle Action',
    component: MotorcycleAction,
  },
  {
    path: '/update-Order',
    title: 'Motorcycle Action',
    component: OrderUpdate,
  },
  {
    path: '/action-menu',
    title: 'Menu Action',
    component: MenuAction,
  },
  {
    path: '/action-product',
    title: 'Product Action',
    component: ProductAction,
  },
  {
    path: '/list-restaurant',
    title: 'Restaurant List',
    component: ListRestaurant,
  },
  {
    path: '/action-adress',
    title: 'Adress Action',
    component: AdressAction,
  },
  {
    path:"/action-driver",
    title: "Create driver",
    component:ActionDriver,
  },
  {
    path: '/list-photo',
    title: 'List Photos',
    component: PhotoList,
  },
  
  {
    path: '/list-order',
    title: 'Order List',
    component: OrderList,
  },
  {
    path: '/list-customer',
    title: 'Customer List',
    component: CustomerList,
  },

  {
    path: '/list-orders',
    title: 'List Orders',
    component: ListOrders,
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
    path: '/order/create',
    title: 'Create Order',
    component: Order,
  },
  {
    path: '/list-driver',
    title: 'Driver List',
    component: ListDriver,
  },
  {
    path: '/list-address',
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
    path:"/action-restaurant",
    title: "Create Restaurant",
    component:createRestaurant,
  },
  {
    path:"/MapTracking",
    title: "Map Tracking",
    component:MapTracking,
  },
];

const routes = [...coreRoutes];

export default routes;