import { Router } from "express";
import { refreshController, signInController, signOutController, signUpController } from "./auth.controller.mjs";
import { authenticateAccessToken, authenticateAllTokens, authenticateRefreshToken } from "../../middleware/auth.middleware.mjs";
import { authRateLimiter } from "../../utils/rateLimiter.mjs";

const authRouter = Router();

authRouter.post('/signup', authRateLimiter, signUpController);
authRouter.post('/signin', authRateLimiter, signInController);
authRouter.post('/signout', authRateLimiter, authenticateAllTokens, signOutController);
authRouter.post('/refresh', authRateLimiter, authenticateRefreshToken, refreshController);

export default authRouter;