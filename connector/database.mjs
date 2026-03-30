import { Sequelize } from "sequelize";
import Config from "../config.mjs";

import createUserModel from "../modules/auth/auth.model.mjs";
import { createProductModel, createProductImageModel } from "../modules/product/product.model.mjs";
import { createCartModel, createCartProduct } from "../modules/cart/cart.model.mjs";
import { createOrderModel } from "../modules/checkout/checkout.model.mjs";

const sequelize = new Sequelize(
    Config.DB_NAME,
    Config.DB_USER,
    Config.DB_PASS,
    {
        host: Config.DB_HOST,
        dialect: 'postgres',
        logging: false,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

const User = createUserModel(sequelize);
const Product = createProductModel(sequelize);
const ProductImage = createProductImageModel(sequelize);
const Cart = createCartModel(sequelize);
const CartProduct = createCartProduct(sequelize);
const Order = createOrderModel(sequelize);

Product.hasMany(ProductImage, { as: 'images', foreignKey: 'productId' });
ProductImage.belongsTo(Product, { as: 'product', foreignKey: 'productId' });

User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Cart.hasMany(CartProduct, { foreignKey: 'cartId' });
CartProduct.belongsTo(Cart, { foreignKey: 'cartId' });

Product.hasMany(CartProduct, { foreignKey: 'productId' });
CartProduct.belongsTo(Product, { foreignKey: 'productId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

export { sequelize, User, Product, ProductImage, Cart, CartProduct, Order };