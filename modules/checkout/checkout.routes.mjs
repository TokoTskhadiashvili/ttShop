import { Router } from "express";
import { completeOrderController, getFinalPriceController, setOrderController } from "./checkout.controller.mjs";
import { authenticateAccessToken } from "../../middleware/auth.middleware.mjs";
import { checkoutRateLimiter } from "../../utils/rateLimiter.mjs";

const checkoutRouter = Router();

checkoutRouter.get('/price', checkoutRateLimiter, authenticateAccessToken, getFinalPriceController);
checkoutRouter.post('/order', checkoutRateLimiter, authenticateAccessToken, setOrderController);
checkoutRouter.post('/complete', checkoutRateLimiter, authenticateAccessToken, completeOrderController);

export default checkoutRouter;