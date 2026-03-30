import { Router } from "express";
import { addProductInCartController, deleteProductFromCartController } from "./cart.controller.mjs";
import { authenticateAccessToken } from "../../middleware/auth.middleware.mjs";
import { cartRateLimiter } from "../../utils/rateLimiter.mjs";

const cartRouter = Router();

cartRouter.post('/items', cartRateLimiter, authenticateAccessToken, addProductInCartController);
cartRouter.delete('/items', cartRateLimiter, authenticateAccessToken, deleteProductFromCartController);

export default cartRouter;