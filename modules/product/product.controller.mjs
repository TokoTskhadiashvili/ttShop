import { allProductsService, productDetailsService } from "./product.service.mjs";

export const productDetailsController = async (req, res) => {
    try {
        const params = req.params;
        const productId = params.productId;

        const response = await productDetailsService(productId);
        return res.status(200).json({ status: 'success', data: response });
    }
    catch (err) {
        if (err.message === 'invalid id') {
            return res.status(404).json({ status: 'failure', message: err.message });
        }
        return res.status(500).json({ status: 'failure', message: err.message });
    }
}

export const allProductsController = async (req, res) => {
    try {
        const page = parseInt(req.query.page);

        const response = await allProductsService(page);
        return res.status(200).json({ status: 'success', data: response });
    }
    catch (err) {
        return res.status(500).json({ status: 'failure', message: err.message });
    }
}