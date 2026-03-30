import { Cart, CartProduct, Product, ProductImage } from "../../connector/database.mjs";
import redisClient from "../../connector/redis.mjs";

export const productDetailsService = async (productId) => {
    const product = await Product.findOne({
        where: {
            id: productId
        }
    });
    if (!productId || !product) {
        throw new Error('invalid id');
    }

    const productData = {
        name: product.name,
        description: product.description,
        details: product.details,
        price: product.price,
        images: []
    };

    const productImages = await ProductImage.findAll({
        where: {
            productId: product.id
        }
    });

    productImages.map(pi => {
        productData.images.push({url: pi.url, alt: pi.alt});
    });

    return { message: 'product fetched', data: productData };
}

export const allProductsService = async (page) => {
    let allProducts = await redisClient.get('products');
    if (!allProducts){
        allProducts = await Product.findAll();

        await redisClient.set('products', JSON.stringify(allProducts), { EX: 3600 });
    }
    else {
        allProducts = JSON.parse(allProducts);
    }

    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;

    const neededProducts = allProducts.slice(startIndex, endIndex);
    const productsData = await Promise.all(
        neededProducts.map(async (product) => {
            let productImages = await redisClient.get('productImages');
            if (!productImages) {
                productImages = await ProductImage.findAll({
                    where: {
                        productId: product.id
                    }
                });

                await redisClient.set('productImages', JSON.stringify(productImages), { EX: 3600 });
            }
            else {
                productImages = JSON.parse(productImages);
            }

            return {
                name: product.name,
                description: product.description,
                price: product.price,
                image: {
                    url: productImages[0].url,
                    alt: productImages[0].alt
                }
            };
        })
    );

    neededProducts.map(async (product) => {
        const productImages = await ProductImage.findAll({
            where: {
                productId: product.id
            }
        });

        productsData.push({
            name: product.name,
            description: product.description,
            price: product.price,
            image: {
                url: productImages[0].url,
                alt: productImages[0].alt
            }
        });
    });

    return { message: 'products fetched', data: productsData };
}