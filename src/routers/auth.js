import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
    registerController,
    loginController,
    refreshController,
    logoutController,
} from '../controllers/auth.js';

import { validateBody } from '../middlewares/validateBody.js';

import { registerSchema, loginSchema } from '../validation/auth.js';

const authRoutes = express.Router();
const jsonParser = express.json();

authRoutes.post(
    '/register',
    jsonParser,
    validateBody(registerSchema),
    ctrlWrapper(registerController),
);

authRoutes.post(
    '/login',
    jsonParser,
    validateBody(loginSchema),
    ctrlWrapper(loginController),
);

authRoutes.post('/refresh', ctrlWrapper(refreshController));

authRoutes.post('/logout', ctrlWrapper(logoutController));


export default authRoutes;