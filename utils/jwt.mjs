import jwt from "jsonwebtoken";

import { User } from "../connector/database.mjs";
import redisClient from "../connector/redis.mjs";
import Config from "../config.mjs";

export const getUserByAccessToken = async (accessToken) => {
    try {
        const redisToken = redisClient.get(`accessToken:${accessToken}`);

        const payload = jwt.decode(accessToken, Config.JWT_A_SECRET);
        const isValid = jwt.verify(accessToken, Config.JWT_A_SECRET);

        const user = await User.findOne({
            where: {
                email: payload.email
            }
        });

        if (!redisToken || !isValid || !payload || !user) {
            return null;
        }

        return user;
    }
    catch (err) {
        return null;
    }
}

export const getUserByRefreshToken = async (refreshToken) => {
    try {
        const redisToken = redisClient.get(`refreshToken:${refreshToken}`);

        const payload = jwt.decode(refreshToken, Config.JWT_R_SECRET);
        const isValid = jwt.verify(refreshToken, Config.JWT_R_SECRET);

        const user = await User.findOne({
            where: {
                email: payload.email
            }
        });

        if (!redisToken || !isValid || !payload || !user) {
            return null;
        }

        return user;
    }
    catch (err) {
        return null;
    }
}

export const validateAccessToken = async (accessToken) => {
    try {
        const redisToken = redisClient.get(`accessToken:${accessToken}`);

        const payload = jwt.decode(accessToken, Config.JWT_A_SECRET);
        const isValid = jwt.verify(accessToken, Config.JWT_A_SECRET);

        const user = await User.findOne({
            where: {
                email: payload.email
            }
        });

        if (!redisToken || !payload || !isValid || !user) {
            return false;
        }

        return true;
    }
    catch (err) {
        return false;
    }
}

export const validateRefreshToken = async (refreshToken) => {
    try {
        const redisToken = redisClient.get(`refreshToken:${refreshToken}`);

        const payload = jwt.decode(refreshToken, Config.JWT_R_SECRET);
        const isValid = jwt.verify(refreshToken, Config.JWT_R_SECRET);

        const user = await User.findOne({
            where: {
                email: payload.email
            }
        });

        if (!redisToken || !payload || !isValid || !user) {
            return false;
        }

        return true;
    }
    catch (err) {
        return false;
    }
}