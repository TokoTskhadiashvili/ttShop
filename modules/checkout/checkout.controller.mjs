import { completeOrderService, getFinalPriceService, setOrderService } from "./checkout.service.mjs";

export const getFinalPriceController = async (req, res) => {
    try {
        const accessToken = req.cookies.accessToken;

        const response = await getFinalPriceService(accessToken);
        return res.status(200).json({ status: 'success', data: response });
    }
    catch (err) {
        return res.status(500).json({ status: 'failure', message: err.message });
    }
}

export const setOrderController = async (req, res) => {
    try {
        const accessToken = req.cookies.accessToken;

        const response = await setOrderService(accessToken);
        return res.status(200).json({ status: 'success', data: response });
    }
    catch (err) {
        return res.status(500).json({ status: 'failure', message: err.message });
    }
}

export const completeOrderController = async (req, res) => {
    try {
        const data = req.body;
        const orderId = data.orderId;

        const accessToken = req.cookies.accessToken;

        const response = await completeOrderService(accessToken, orderId);
        return res.status(200).json({ status: 'success', data: response });
    }
    catch (err) {
        if (err.message === 'invalid id') {
            return res.status(404).json({ status: 'failure', message: err.message });
        }
        return res.status(500).json({ status: 'failure', message: err.message });
    }
}