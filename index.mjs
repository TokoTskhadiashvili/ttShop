import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./modules/auth/auth.routes.mjs";
import cartRouter from "./modules/cart/cart.routes.mjs";
import checkoutRouter from "./modules/checkout/checkout.routes.mjs";
import productRouter from "./modules/product/product.routes.mjs";
import sellerRouter from "./modules/seller/seller.routes.mjs";
import { sequelize } from "./connector/database.mjs";
import redisClient from "./connector/redis.mjs";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const createDatabaseConnection = async () => {
    try {
        await sequelize.authenticate();
        sequelize.sync();
    }
    catch (err) {
        console.error('Unable to establish DB connection: ', err);
    }
}

const createRedisConnection = async () => {
    try {
        await redisClient.connect();
    }
    catch (err) {
        console.error('Unable to establish Redis connection: ', err);
    }
}

createDatabaseConnection();
createRedisConnection();

app.listen(8080, (err) => {
    if (err) {
        console.error('Error: ' + err);
        return;
    }
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/checkout', checkoutRouter);
app.use('/api/v1/seller', sellerRouter);