import { DataTypes } from "sequelize";

export const createOrderModel = (sequelize) => {
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        paypalOrderId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        tableName: 'orders',
        timestamps: true
    });

    return Order;
}