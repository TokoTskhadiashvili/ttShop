import { getUserByAccessToken, getUserByRefreshToken, validateAccessToken, validateRefreshToken } from "../utils/jwt.mjs";

export const authenticateAccessToken = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            throw new Error('missing token');
        }

        const user = getUserByAccessToken(accessToken);
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

        const user = getUserByRefreshToken(refreshToken);
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
        console.log('asd');

        const isValidAccessToken = validateAccessToken(accessToken);
        const isValidRefreshToken = validateRefreshToken(refreshToken);

        const userViaAccess = getUserByAccessToken(accessToken);
        const userViaRefresh = getUserByRefreshToken(refreshToken);

        if (!isValidAccessToken || !isValidRefreshToken || userViaAccess.email != userViaRefresh.email) {
            throw new Error('invalid token');
        }

        next();
    }
    catch (err) {
        throw err.message;
    }
}