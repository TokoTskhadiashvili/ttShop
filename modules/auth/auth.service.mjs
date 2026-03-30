import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { getUserByAccessToken, getUserByRefreshToken, validateAccessToken, validateRefreshToken } from "../../utils/jwt.mjs";
import { User, Cart } from "../../connector/database.mjs";
import redisClient from "../../connector/redis.mjs";
import Config from "../../config.mjs";

export const signUpService = async (firstName, lastName, email, password, repeatPassword) => {
    let user = await User.findOne({
        where: {
            id: 1
        }
    });

    const hash = await bcrypt.hash(password, 10);

    if (!user) {
        // SELLER user
        await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hash,
            role: 'SELLER'
        });

        const accessToken = jwt.sign({ email: email, role: 'SELLER' }, Config.JWT_A_SECRET);
        const refreshToken = jwt.sign({ email: email, role: 'SELLER' }, Config.JWT_R_SECRET);

        redisClient.set(`accessToken:${accessToken}`, email, { EX: 3600 });
        redisClient.set(`refreshToken:${refreshToken}`, email, { EX: 3600 * 24 });

        return { message: 'account created', tokens: { accessToken: accessToken, refreshToken: refreshToken } };
    }

    user = await User.findOne({
        where: {
            email: email
        }
    });

    if (user) {
        throw new Error('email used');
    }
    if (password != repeatPassword) {
        throw new Error('passwords do not match');
    }

    // BUYER user
    user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hash
    });

    await Cart.create({
        userId: user.id
    });

    const accessToken = jwt.sign({ email: email, role: 'BUYER' }, Config.JWT_A_SECRET);
    const refreshToken = jwt.sign({ email: email, role: 'BUYER' }, Config.JWT_R_SECRET);

    redisClient.set(`accessToken:${accessToken}`, email, { EX: 3600 });
    redisClient.set(`refreshToken:${refreshToken}`, email, { EX: 3600 * 24 });

    return { message: 'account created', tokens: { accessToken: accessToken, refreshToken: refreshToken } };
}

export const signInService = async (email, password) => {
    const user = await User.findOne({
        where: {
            email: email
        }
    });

    if (!bcrypt.compare(password, user.password)) {
        throw new Error('incorrect email or password');
    }

    const accessToken = jwt.sign({ email: email, role: user.role }, Config.JWT_A_SECRET);
    const refreshToken = jwt.sign({ email: email, role: user.role }, Config.JWT_R_SECRET);

    return { message: 'logged in', tokens: { accessToken: accessToken, refreshToken: refreshToken } };
}

export const signOutService = async (accessToken, refreshToken) => {
    const user = getUserByAccessToken(accessToken);
        
    if (!validateAccessToken(accessToken) || !validateRefreshToken(refreshToken) || !user) {
        throw new Error('invalid token');
    }

    redisClient.del(`accessToken:${accessToken}`);
    redisClient.del(`refreshToken:${refreshToken}`);

    return { message: 'logged out' };
}

export const refreshService = async (accessToken, refreshToken) => {
    if (!accessToken || !refreshToken) {
        throw new Error('missing token');
    }

    const isValidRefreshToken = validateRefreshToken(refreshToken);
    const user = getUserByRefreshToken(refreshToken);
    if (!isValidRefreshToken || !user) {
        throw new Error('invalid token');
    }

    const newAccessToken = jwt.sign({ email: user.email, role: user.role }, Config.JWT_A_SECRET);
    redisClient.del(`accessToken:${accessToken}`);

    return { message: 'refreshed', tokens: { accessToken: newAccessToken } };
}