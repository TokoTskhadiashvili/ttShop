import axios from "axios";
import crypto from "crypto";

import Config from "../../config.mjs";
import { Cart, Order } from "../../connector/database.mjs";
import { calculateCheckoutPrice, getPaypalAccessToken } from "../../utils/cart.mjs";
import { getUserByAccessToken } from "../../utils/jwt.mjs"

export const getFinalPriceService = async (accessToken) => {
    const user = await getUserByAccessToken(accessToken);

    const cart = await Cart.findOne({
        where: {
            userId: user.id
        }
    });

    const price = await calculateCheckoutPrice(cart.id);

    return { message: 'price calculated', price: price };
}

export const setOrderService = async (accessToken) => {
    const user = await getUserByAccessToken(accessToken);

    const cart = await Cart.findOne({
        where: {
            userId: user.id
        }
    });

    const price = await calculateCheckoutPrice(cart.id);
    if (price === 0) {
        throw new Error('invalid price');
    }

    const paypalToken = await getPaypalAccessToken();

    const response = await axios.post(`${Config.PAYPAL_URL}/v2/checkout/orders`, {
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'USD',
                    value: price
                }
            }
        ]
    }, {
        headers: {
            Authorization: `Bearer ${paypalToken}`
        }
    });

    return { message: 'order set', id: response.data.id };
}

export const completeOrderService = async (accessToken, orderId) => {
    const user = await getUserByAccessToken(accessToken);

    const cart = await Cart.findOne({
        where: {
            userId: user.id
        }
    });
    const price = calculateCheckoutPrice(cart.id);
    const newUUID = crypto.randomUUID();

    const paypalToken = await getPaypalAccessToken();
    const response = await axios.post(`${Config.PAYPAL_URL}/v2/checkout/orders/${orderId}/capture`, {}, {
        headers: {
            Authorization: `Bearer ${paypalToken}`
        }
    });

    await Order.create({ id: newUUID, paypalOrderId: orderId, price: price });

    return { message: 'order complete' };
}