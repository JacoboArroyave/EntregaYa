<<<<<<< HEAD
// import { Component, lazy } from "react";
const coreRoutes = [{
    // path:"/",
    // title:"como se llame",
    // Component Cualquier componente
}]
export  default coreRoutes;
=======
/*import { lazy } from 'react';

// Restaurant
const ListRestaurant = lazy(() => import('../pages/Restaurant/ListRestaurant'));
const CreateRestaurant = lazy(() => import('../pages/Restaurant/CreateRestaurant'));
const UpdateRestaurant = lazy(() => import('../pages/Restaurant/UpdateRestaurant'));
const DeleteRestaurant = lazy(() => import('../pages/Restaurant/DeleteRestaurant'));

// Driver
const ListDriver = lazy(() => import('../pages/Driver/ListDriver'));
const CreateDriver = lazy(() => import('../pages/Driver/CreateDriver'));
const UpdateDriver = lazy(() => import('../pages/Driver/UpdateDriver'));
const DeleteDriver = lazy(() => import('../pages/Driver/DeleteDriver'));

// Product
const ListProduct = lazy(() => import('../pages/Product/ListProduct'));
const CreateProduct = lazy(() => import('../pages/Product/CreateProduct'));
const UpdateProduct = lazy(() => import('../pages/Product/UpdateProduct'));
const DeleteProduct = lazy(() => import('../pages/Product/DeleteProduct'));

// Menu
const ListMenu = lazy(() => import('../pages/Menu/ListMenu'));
const CreateMenu = lazy(() => import('../pages/Menu/CreateMenu'));
const UpdateMenu = lazy(() => import('../pages/Menu/UpdateMenu'));
const DeleteMenu = lazy(() => import('../pages/Menu/DeleteMenu'));

// Customer
const ListCustomer = lazy(() => import('../pages/Customer/ListCustomer'));
const CreateCustomer = lazy(() => import('../pages/Customer/CreateCustomer'));
const UpdateCustomer = lazy(() => import('../pages/Customer/UpdateCustomer'));
const DeleteCustomer = lazy(() => import('../pages/Customer/DeleteCustomer'));

// Shift
const ListShift = lazy(() => import('../pages/Shift/ListShift'));
const CreateShift = lazy(() => import('../pages/Shift/CreateShift'));
const UpdateShift = lazy(() => import('../pages/Shift/UpdateShift'));
const DeleteShift = lazy(() => import('../pages/Shift/DeleteShift'));

// Motorcycle
const ListMotorcycle = lazy(() => import('../pages/Motorcycle/ListMotorcycle'));
const CreateMotorcycle = lazy(() => import('../pages/Motorcycle/CreateMotorcycle'));
const UpdateMotorcycle = lazy(() => import('../pages/Motorcycle/UpdateMotorcycle'));
const DeleteMotorcycle = lazy(() => import('../pages/Motorcycle/DeleteMotorcycle'));

// Order
const ListOrder = lazy(() => import('../pages/Order/ListOrder'));
const CreateOrder = lazy(() => import('../pages/Order/CreateOrder'));
const UpdateOrder = lazy(() => import('../pages/Order/UpdateOrder'));
const DeleteOrder = lazy(() => import('../pages/Order/DeleteOrder'));

// Issue
const ListIssue = lazy(() => import('../pages/Issue/ListIssue'));
const CreateIssue = lazy(() => import('../pages/Issue/CreateIssue'));
const UpdateIssue = lazy(() => import('../pages/Issue/UpdateIssue'));
const DeleteIssue = lazy(() => import('../pages/Issue/DeleteIssue'));

// Photo
const ListPhoto = lazy(() => import('../pages/Photo/ListPhoto'));
const CreatePhoto = lazy(() => import('../pages/Photo/CreatePhoto'));
const UpdatePhoto = lazy(() => import('../pages/Photo/UpdatePhoto'));
const DeletePhoto = lazy(() => import('../pages/Photo/DeletePhoto'));

// Address
const ListAddress = lazy(() => import('../pages/Address/ListAddress'));
const CreateAddress = lazy(() => import('../pages/Address/CreateAddress'));
const UpdateAddress = lazy(() => import('../pages/Address/UpdateAddress'));
const DeleteAddress = lazy(() => import('../pages/Address/DeleteAddress'));

const coreRoutes = [
  {
    path: '/list-restaurant',
    title: 'ListRestaurant',
    component: ListRestaurant,
  },
  {
    path: '/create-restaurant',
    title: 'CreateRestaurant',
    component: CreateRestaurant,
  },
  {
    path: '/update-restaurant/:id',
    title: 'UpdateRestaurant',
    component: UpdateRestaurant,
  },
  {
    path: '/delete-restaurant/:id',
    title: 'DeleteRestaurant',
    component: DeleteRestaurant,
  },

  {
    path: '/list-driver',
    title: 'ListDriver',
    component: ListDriver,
  },
  {
    path: '/create-driver',
    title: 'CreateDriver',
    component: CreateDriver,
  },
  {
    path: '/update-driver/:id',
    title: 'UpdateDriver',
    component: UpdateDriver,
  },
  {
    path: '/delete-driver/:id',
    title: 'DeleteDriver',
    component: DeleteDriver,
  },

  {
    path: '/list-product',
    title: 'ListProduct',
    component: ListProduct,
  },
  {
    path: '/create-product',
    title: 'CreateProduct',
    component: CreateProduct,
  },
  {
    path: '/update-product/:id',
    title: 'UpdateProduct',
    component: UpdateProduct,
  },
  {
    path: '/delete-product/:id',
    title: 'DeleteProduct',
    component: DeleteProduct,
  },

  {
    path: '/list-menu',
    title: 'ListMenu',
    component: ListMenu,
  },
  {
    path: '/create-menu',
    title: 'CreateMenu',
    component: CreateMenu,
  },
  {
    path: '/update-menu/:id',
    title: 'UpdateMenu',
    component: UpdateMenu,
  },
  {
    path: '/delete-menu/:id',
    title: 'DeleteMenu',
    component: DeleteMenu,
  },

  {
    path: '/list-customer',
    title: 'ListCustomer',
    component: ListCustomer,
  },
  {
    path: '/create-customer',
    title: 'CreateCustomer',
    component: CreateCustomer,
  },
  {
    path: '/update-customer/:id',
    title: 'UpdateCustomer',
    component: UpdateCustomer,
  },
  {
    path: '/delete-customer/:id',
    title: 'DeleteCustomer',
    component: DeleteCustomer,
  },

  {
    path: '/list-shift',
    title: 'ListShift',
    component: ListShift,
  },
  {
    path: '/create-shift',
    title: 'CreateShift',
    component: CreateShift,
  },
  {
    path: '/update-shift/:id',
    title: 'UpdateShift',
    component: UpdateShift,
  },
  {
    path: '/delete-shift/:id',
    title: 'DeleteShift',
    component: DeleteShift,
  },

  {
    path: '/list-motorcycle',
    title: 'ListMotorcycle',
    component: ListMotorcycle,
  },
  {
    path: '/create-motorcycle',
    title: 'CreateMotorcycle',
    component: CreateMotorcycle,
  },
  {
    path: '/update-motorcycle/:id',
    title: 'UpdateMotorcycle',
    component: UpdateMotorcycle,
  },
  {
    path: '/delete-motorcycle/:id',
    title: 'DeleteMotorcycle',
    component: DeleteMotorcycle,
  },

  {
    path: '/list-order',
    title: 'ListOrder',
    component: ListOrder,
  },
  {
    path: '/create-order',
    title: 'CreateOrder',
    component: CreateOrder,
  },
  {
    path: '/update-order/:id',
    title: 'UpdateOrder',
    component: UpdateOrder,
  },
  {
    path: '/delete-order/:id',
    title: 'DeleteOrder',
    component: DeleteOrder,
  },

  {
    path: '/list-issue',
    title: 'ListIssue',
    component: ListIssue,
  },
  {
    path: '/create-issue',
    title: 'CreateIssue',
    component: CreateIssue,
  },
  {
    path: '/update-issue/:id',
    title: 'UpdateIssue',
    component: UpdateIssue,
  },
  {
    path: '/delete-issue/:id',
    title: 'DeleteIssue',
    component: DeleteIssue,
  },

  {
    path: '/list-photo',
    title: 'ListPhoto',
    component: ListPhoto,
  },
  {
    path: '/create-photo',
    title: 'CreatePhoto',
    component: CreatePhoto,
  },
  {
    path: '/update-photo/:id',
    title: 'UpdatePhoto',
    component: UpdatePhoto,
  },
  {
    path: '/delete-photo/:id',
    title: 'DeletePhoto',
    component: DeletePhoto,
  },

  {
    path: '/list-address',
    title: 'ListAddress',
    component: ListAddress,
  },
  {
    path: '/create-address',
    title: 'CreateAddress',
    component: CreateAddress,
  },
  {
    path: '/update-address/:id',
    title: 'UpdateAddress',
    component: UpdateAddress,
  },
  {
    path: '/delete-address/:id',
    title: 'DeleteAddress',
    component: DeleteAddress,
  },
];

const routes = [...coreRoutes];
export default routes;

*/
>>>>>>> 9829f53 (Update Files)
