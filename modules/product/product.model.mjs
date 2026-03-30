import { DataTypes } from "sequelize";

export const createProductModel = (sequelize) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        details: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        tableName: 'products',
        timestamps: true
    });

    return Product;
}

export const createProductImageModel = (sequelize) => {
    const ProductImage = sequelize.define('ProductImage', {
        productId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        alt: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'product_images',
        timestamps: true
    });

    return ProductImage;
}