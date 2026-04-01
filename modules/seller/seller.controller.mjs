import { addProductService, deleteProductService, updateProductService, getOrdersService } from "./seller.service.mjs";

export const addProductController = async (req, res) => {
    try {
        const data = req.body;
        const product = data.product;

        const response = await addProductService(product);
        return res.status(200).json({ status: 'success', data: response });
    }
    catch (err) {
        return res.status(500).json({ status: 'failure', message: err.message });
    }
}

export const deleteProductController = async (req, res) => {
    try {
        const data = req.body;
        const productId = data.productId;

        const response = await deleteProductService(productId);
        return res.status(200).json({ status: 'success', data: response });
    }
    catch (err) {
        return res.status(500).json({ status: 'failure', message: err.message });
    }
}

export const updateProductController = async (req, res) => {
    try {
        const data = req.body;
        const product = data.product;
        const productId = data.productId;

        const response = await updateProductService(productId, product);
        return res.status(200).json({ status: 'success', data: response });
    }
    catch (err) {
        return res.status(500).json({ status: 'failure', message: err.message });
    }
}

export const getOrdersController = async (req, res) => {
    try {
        const response = await getOrdersService();
        return res.status(200).json({ status: 'success', data: response });
    }
    catch (err) {
        return res.status(500).json({ status: 'failure', message: err.message });
    }
}