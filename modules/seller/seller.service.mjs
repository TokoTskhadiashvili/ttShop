import { Order, Product } from "../../connector/database.mjs";

export const addProductService = async (product) => {
    const { id, name, description, details, price } = product;

    const dbProduct = await Product.findOne({
        where: {
            name: name
        }
    });
    if (dbProduct) {
        throw new Error('invalid name');
    }

    await Product.create({
        id: id,
        name: name,
        description: description,
        details: details,
        price: price
    });

    return { message: 'product created' };
}

export const deleteProductService = async (productId) => {
    const dbProduct = await Product.findOne({
        where: {
            id: productId
        }
    });
    if (!dbProduct) {
        throw new Error('invalid id');
    }

    await dbProduct.destroy();

    return { message: 'product deleted' };
}

export const updateProductService = async (productId, product) => {
    const dbProduct = await Product.findOne({
        where: {
            id: productId
        }
    });
    if (!dbProduct) {
        throw new Error('invalid id');
    }

    dbProduct.name = product.name;
    dbProduct.description = product.description;
    dbProduct.details = product.details;
    dbProduct.price = product.price;

    await dbProduct.save();

    return { message: 'product updated' };
}

export const getOrdersService = async () => {
    const orders = await Order.findAll();
    const ordersData = [];

    orders.map(order => {
        ordersData.push({
            paypalOrderId: order.paypalOrderId,
            price: order.price
        });
    });

    return { message: 'orders fetched', orders: ordersData };
}