import { Product, Cart, CartProduct } from "../../connector/database.mjs";
import { calculateCheckoutPrice } from "../../utils/cart.mjs";
import { getUserByAccessToken } from "../../utils/jwt.mjs";

export const addProductInCartService = async (accessToken, productId) => {
    const product = await Product.findOne({
        where: {
            id: productId
        }
    });
    if (!product) {
        throw new Error('invalid id');
    }

    const user = await getUserByAccessToken(accessToken);

    const cart = await Cart.findOne({
        where: {
            userId: user.id
        }
    });

    const cartProduct = await CartProduct.findOne({
        where: {
            cartId: cart.id,
            productId: productId
        }
    })

    await CartProduct.create({
        cartId: cart.id,
        productId: productId
    });

    return { message: 'product added' };
}

export const deleteProductFromCartService = async (accessToken, productId) => {
    const product = await Product.findOne({
        where: {
            id: productId
        }
    });
    if (!product) {
        throw new Error('invalid id');
    }

    const user = await getUserByAccessToken(accessToken);

    const cart = await Cart.findOne({
        where: {
            userId: user.id
        }
    });

    
    const cartProduct = await CartProduct.findOne({
        where: {
            cartId: cart.id,
            productId: productId
        }
    });
    
    if (cartProduct) {
        await cartProduct.destroy();
        
        return { message: 'product deleted' };
    }

    throw new Error('invalid id');
}