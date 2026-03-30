import { DataTypes } from "sequelize";

export const createCartModel = (sequelize) => {
    const Cart = sequelize.define('Cart', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'carts',
        timestamps: true
    });

    return Cart;
}

export const createCartProduct = (sequelize) => {
    const CartProduct = sequelize.define('CartProduct', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        tableName: 'cart_products',
        timestamps: true
    });

    return CartProduct;
}