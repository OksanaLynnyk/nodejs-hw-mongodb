import bcrypt from "bcrypt";
import crypto from 'node:crypto';

import createHttpError from "http-errors";
import { User } from "../db/models/user.js";
import { Session } from '../db/models/session.js';
import { accessTokenLifetime, refreshTokenLifetime } from "../constants/users.js";


const createSession = () => {
    const accessToken = crypto.randomBytes(30).toString("base64");
    const refreshToken = crypto.randomBytes(30).toString("base64");
    const accessTokenValidUntil = new Date(Date.now() + accessTokenLifetime);
    const refreshTokenValidUntil = new Date(Date.now() + refreshTokenLifetime);

    return {
        accessToken,
        refreshToken,
        accessTokenValidUntil,
        refreshTokenValidUntil,
    };
};

export const registerUser = async (payload) => {
    const user = await User.findOne({ email: payload.email });
    if (user) {
        throw createHttpError(409, 'Email in use');
    }

    payload.password = await bcrypt.hash(payload.password, 10);
    return User.create(payload);
};

export const loginUser = async (email, password) => {

    const user = await User.findOne({ email });
    if (user === null) {
        throw createHttpError(401, "Email or password invalid");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw createHttpError(401, "Email or password invalid");
    }

    await Session.deleteOne({ userId: user._id });

    const sessionData = createSession();

    const userSession = await Session.create({
        userId: user._id,
        ...sessionData,
    });

    return userSession;
};

export const refreshSession = async (sessionId, refreshToken) => {
    const session = await Session.findById(sessionId);

    if (session === null) {
        throw createHttpError(401, 'Session not found');
    }

    if (session.refreshToken !== refreshToken) {
        throw createHttpError(401, 'Session not found');
    }

    if (new Date() > session.refreshTokenValidUntil) {
        throw createHttpError(401, 'Refresh token is expired');
    }

    const sessionData = createSession();

    const userSession = await Session.create({
        userId: session.userId,
        ...sessionData,
    });

    return userSession;
};

export const logoutUser = async (sessionId) => {
    await Session.deleteOne({ _id: sessionId });
};