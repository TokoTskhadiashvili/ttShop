import { addProductInCartService, deleteProductFromCartService } from "./cart.service.mjs";

export const addProductInCartController = async (req, res) => {
    try {
        const data = req.body;
        const productId = data.productId;

        const accessToken = req.cookies.accessToken;

        const response = await addProductInCartService(accessToken, productId);
        return res.status(200).json({ status: 'success', data: response });
    }
    catch (err) {
        if (err.message === 'invalid id') {
            return res.status(404).json({ status: 'failure', message: err.message });
        }
        return res.status(500).json({ status: 'failure', message: err.message });
    }
}

export const deleteProductFromCartController = async (req, res) => {
    try {
        const data = req.body;
        const productId = data.productId;

        const accessToken = req.cookies.accessToken;

        const response = await deleteProductFromCartService(accessToken, productId);
        return res.status(200).json({ status: 'success', data: response });
    }
    catch (err) {
        if (err.message === 'invalid id') {
            return res.status(404).json({ status: 'failure', message: err.message });
        }
        return res.status(500).json({ status: 'failure', message: err.message });
    }
}