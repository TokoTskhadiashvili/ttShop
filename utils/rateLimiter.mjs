import rateLimit from "express-rate-limit";

export const authRateLimiter = rateLimit({
    windowMs: 60 * 15 * 1000, // 15 minutes
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            status: 'failure',
            data: {
                message: 'too many requests'
            }
        });
    }
});

export const cartRateLimiter = rateLimit({
    windowMs: 60 * 5 * 1000, // 5 minutes
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            status: 'failure',
            data: {
                message: 'too many requests'
            }
        });
    }
});

export const checkoutRateLimiter = rateLimit({
    windowMs: 60 * 5 * 1000, // 5 minutes
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            status: 'failure',
            data: {
                message: 'too many requests'
            }
        });
    }
});

export const productRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            status: 'failure',
            data: {
                message: 'too many requests'
            }
        });
    }
});