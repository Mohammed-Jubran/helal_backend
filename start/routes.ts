/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{

  Route.group(()=>{
    Route.get("/:id", "CategoriesController.getById");
    Route.get("/", "CategoriesController.getAll");
    Route.post("/", "CategoriesController.create");
    Route.put("/", "CategoriesController.update");
    Route.delete("/:id", "CategoriesController.destory");
  }).prefix('/categories');

  Route.group(()=>{
    Route.get("/:id", "OrderDetailsController.getById");
    Route.get("/", "OrderDetailsController.getAll");
    Route.post("/", "OrderDetailsController.create");
    Route.put("/", "OrderDetailsController.update");
    Route.delete("/:id", "OrderDetailsController.destory");
  }).prefix('/orderDetails');

  Route.group(() => {
    Route.post('/', 'OrdersController.create');
    Route.get('/:userId', 'OrdersController.getOrdersByUserId');
  }).prefix('/orders');
  


  Route.group(()=>{
    Route.get('/category/:categoryId', 'ProductsController.getByCategoryId');
    // Route.get("/:id", "ProductsController.getById");
    Route.get("/", "ProductsController.getAll");
    Route.get("/active", "ProductsController.getFeaturdProducts");
    Route.post("/", "ProductsController.create");
    Route.put("/", "ProductsController.update");
    Route.delete("/:id", "ProductsController.destory");
  }).prefix('/products');

  Route.group(()=>{
    //Route.get("/:id", "UsersController.getById");
    Route.get("/", "UsersController.getMe");
    Route.post("/", "UsersController.create");
    Route.put("/", "UsersController.update");
    Route.delete("/:id", "UsersController.destory");
    Route.post("/login" ,"UsersController.login");
    Route.post("/logout" ,"UsersController.logout");
  }).prefix('/users');

}).prefix('/api')







