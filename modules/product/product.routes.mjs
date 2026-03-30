import { Router } from "express";

import { allProductsController, productDetailsController } from "./product.controller.mjs";
import { productRateLimiter } from "../../utils/rateLimiter.mjs";

const productRouter = Router();

productRouter.get('/:productId', productRateLimiter, productDetailsController);
productRouter.get('/', productRateLimiter, allProductsController);

export default productRouter;