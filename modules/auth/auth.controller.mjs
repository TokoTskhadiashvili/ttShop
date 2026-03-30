import { signUpService, signInService, signOutService, refreshService } from "./auth.service.mjs";

export const signUpController = async (req, res) => {
    try {
        const data = req.body;

        const response = await signUpService(data.firstName, data.lastName, data.email, data.password, data.repeatPassword);
        const accessToken = response.tokens.accessToken;
        const refreshToken = response.tokens.refreshToken;

        const responseData = { message: response.message };

        res.cookie('accessToken', accessToken, { maxAge: 3600, httpOnly: true });
        res.cookie('refreshToken', refreshToken, { maxAge: 3600 * 24, httpOnly: true });
        return res.status(201).json({ status: 'success', data: responseData });
    }
    catch (err) {
        if (err.message === 'email used' || err.message === 'passwords do not match') {
            return res.status(409).json({ status: 'failure', message: err.message });
        }
        return res.status(500).json({ status: 'failure', message: err.message });
    }
}

export const signInController = async (req, res) => {
    try {
        const data = req.body;

        const response = await signInService(data.email, data.password);
        const accessToken = response.tokens.accessToken;
        const refreshToken = response.tokens.refreshToken;

        const responseData = { message: response.message };

        res.cookie('accessToken', accessToken, { maxAge: 3600, httpOnly: true });
        res.cookie('refreshToken', refreshToken, { maxAge: 3600 * 24, httpOnly: true });
        return res.status(200).json({ status: 'success', data: responseData });
    }
    catch (err) {
        if (err.message === 'incorrect email or password') {
            return res.status(401).json({ status: 'failure', message: err.message });
        }
        return res.status(500).json({ status: 'failure', message: err.message });
    }
}

export const signOutController = async (req, res) => {
    try {
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;

        const response = await signOutService(accessToken, refreshToken);

        res.cookie('accessToken', '', { maxAge: 0 });
        res.cookie('refreshToken', '', { maxAge: 0 });
        return res.status(200).json({ status: 'success', data: response });
    }
    catch (err) {
        if (err.message === 'invalid token') {
            return res.status(422).json({ status: 'failure', message: err.message });
        }
        return res.status(500).json({ status: 'failure', message: err.message });
    }
}

export const refreshController = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        const accessToken = req.cookies.accessToken;

        const response = await refreshService(accessToken, refreshToken);

        const responseData = { message: response.message };
        
        res.cookie('accessToken', response.tokens.accessToken, { maxAge: 3600 });
        return res.status(200).json({ status: 'success', data: responseData });
    }
    catch (err) {
        if (err.message === 'missing token') {
            return res.status(422).json({ status: 'failure', message: err.message });
        }
        return res.status(500).json({ status: 'failure', message: err.message });
    }
}