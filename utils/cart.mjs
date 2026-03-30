import axios from "axios";

import Config from "../config.mjs";
import { CartProduct, Product } from "../connector/database.mjs";

export const calculateCheckoutPrice = async (cartId) => {
    const cartProducts = await CartProduct.findAll({
            where: {
                cartId: cartId
            }
        });

        const productPrices = [];
        await Promise.all(
            cartProducts.map(async (cartProduct) => {
                const product = await Product.findOne({
                    where: {
                        id: cartProduct.productId
                    }
                });
                
                productPrices.push(product.price);
            })
        );

        const allPrice = productPrices.reduce((accumulator, current) => accumulator + current, 0);

        return allPrice;
}

export const getPaypalAccessToken = async () => {
    try {
        const response = await axios({
            url: `${Config.PAYPAL_URL}/v1/oauth2/token`,
            method: 'post',
            data: 'grant_type=client_credentials',
            auth: {
                username: Config.PAYPAL_CLIENT_ID,
                password: Config.PAYPAL_CLIENT_SECRET
            }
        });

        return response.data.access_token;
    }
    catch (err) {
        return null;
    }
}