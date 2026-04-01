import { getUserByAccessToken, getUserByRefreshToken, validateAccessToken, validateRefreshToken } from "../utils/jwt.mjs";

export const authenticateAccessToken = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            throw new Error('missing token');
        }

        const user = await getUserByAccessToken(accessToken);
        if (!user) {
            throw new Error('invalid token');
        }

        next();
    }
    catch (err) {
        throw err.message;
    }
}

export const authenticateRefreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            throw new Error('missing token');
        }

        const user = await getUserByRefreshToken(refreshToken);
        if (!user) {
            throw new Error('invalid token');
        }

        next();
    }
    catch (err) {
        throw err.message;
    }
}

export const authenticateAllTokens = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;
        if (!accessToken || !refreshToken) {
            throw new Error('missing token');
        }

        const isValidAccessToken = validateAccessToken(accessToken);
        const isValidRefreshToken = validateRefreshToken(refreshToken);

        const userViaAccess = await getUserByAccessToken(accessToken);
        const userViaRefresh = await getUserByRefreshToken(refreshToken);

        if (!isValidAccessToken || !isValidRefreshToken || userViaAccess.email != userViaRefresh.email) {
            throw new Error('invalid token');
        }

        next();
    }
    catch (err) {
        throw err.message;
    }
}

export const authenticateAccessTokenSeller = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            throw new Error('missing token');
        }

        const isValidAccessToken = validateAccessToken(accessToken);

        const userViaAccess = await getUserByAccessToken(accessToken);

        if (!isValidAccessToken || userViaAccess.role !== 'SELLER') {
            throw new Error('invalid token');
        }

        next();
    }
    catch (err) {
        throw err.message;
    }
}