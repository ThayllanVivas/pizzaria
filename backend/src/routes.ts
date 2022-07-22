import { Router } from 'express';
import { AuthUser_CONTROLLER } from './controllers/user/AuthUser_Controller';
import { CreateUser_CONTROLLER } from './controllers/user/CreateUser_Controller';
import { DetailsUser_CONTROLLER } from './controllers/user/DetailsUser_Controller';
import { ListCategory_CONTROLLER } from './controllers/category/ListCategory_Controller';
import { CreateProduct_CONTROLLER } from './controllers/product/CreateProduct_Controller';
import { CreateCategory_CONTROLLER } from './controllers/category/CreateCategory_Controller';

import { AddItem_CONTROLLER } from './controllers/order/AddItem_Controller';
import { SendOrder_CONTROLLER } from './controllers/order/SendOrder_Controller';
import { ListOrder_CONTROLLER } from './controllers/order/ListOrder_Controller';
import { DeleteItem_CONTROLLER } from './controllers/order/DeleteItem_Controller';
import { CreateOrder_Controller } from './controllers/order/CreateOrder_Controller';
import { DeleteOrder_CONTROLLER } from './controllers/order/DeleteOrder_Controller';
import { DetailOrder_CONTROLLER } from './controllers/order/DetailOrder_Controller';
import { FinishOrder_CONTROLLER } from './controllers/order/FinishOrder_Controller';
import { ListProduct_CONTROLLER } from './controllers/product/ListProduct_Controller';
import { ListProductByCategories_CONTROLLER } from './controllers/product/ListProductByCategories_Controller';

import multer from 'multer'
import isAuthenticated from './middlewares/isAuthenticated';
import bannerRouterConfig from './config/multer'

const router = Router(); //to copy what is inside Router() into router const

const upload = multer(bannerRouterConfig.upload("tmp")) //explicite the directory for images of products

// ROTA USER 
router.post("/signup", (new CreateUser_CONTROLLER).handle); //create user
router.post("/signin", (new AuthUser_CONTROLLER).handle); //make login
router.get("/me", isAuthenticated, (new DetailsUser_CONTROLLER).handle); //access my profile

// ROTA CATEGORY
router.post("/category", isAuthenticated, (new CreateCategory_CONTROLLER).handle) //create category
router.get("/category", isAuthenticated, new ListCategory_CONTROLLER().handle) //list all categories

// ROTA PRODUCT
router.post("/product", isAuthenticated, upload.single('banner'), new CreateProduct_CONTROLLER().handle) //create a product
router.get("/product", isAuthenticated, new ListProduct_CONTROLLER().handle) //list all the product
router.get("/category/product", isAuthenticated, new ListProductByCategories_CONTROLLER().handle) //list all the product of a specific category

// ROTA ORDER
router.post("/order", isAuthenticated, new CreateOrder_Controller().handle) //create an order
router.delete("/order", isAuthenticated, new DeleteOrder_CONTROLLER().handle) //delete an order
router.post("/order/item", isAuthenticated, new AddItem_CONTROLLER().handle) //add new items to an order
router.delete("/order/item", isAuthenticated, new DeleteItem_CONTROLLER().handle) //delete an item of an order
router.put("/order/send", isAuthenticated, new SendOrder_CONTROLLER().handle) //send an order
router.get("/orders", isAuthenticated, new ListOrder_CONTROLLER().handle) //get all orders no drafts
router.get("/order/detail", isAuthenticated, new DetailOrder_CONTROLLER().handle) //get all item from a specific order
router.put("/order/finish", isAuthenticated, new FinishOrder_CONTROLLER().handle) //finish an order

export { router }; //to be visible on server.ts