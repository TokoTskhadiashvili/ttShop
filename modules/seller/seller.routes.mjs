import { Router } from "express";
import { addProductController, deleteProductController, getOrdersController, updateProductController } from "./seller.controller.mjs";
import { authenticateAccessTokenSeller } from "../../middleware/auth.middleware.mjs";

const sellerRouter = Router();

sellerRouter.post('/product', authenticateAccessTokenSeller, addProductController);
sellerRouter.delete('/product', authenticateAccessTokenSeller, deleteProductController);
sellerRouter.put('/product', authenticateAccessTokenSeller, updateProductController);
sellerRouter.get('/orders', authenticateAccessTokenSeller, getOrdersController);

export default sellerRouter;