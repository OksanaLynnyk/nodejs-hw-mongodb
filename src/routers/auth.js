import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
    registerController,
    loginController,
    refreshController,
    logoutController,
    requestResetEmailController,
    resetPasswordController,
} from '../controllers/auth.js';

import { validateBody } from '../middlewares/validateBody.js';

import {
    registerSchema,
    loginSchema,
    requestResetEmailSchema,
    resetPasswordSchema,
} from '../validation/auth.js';

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

authRoutes.post(
    '/send-reset-email',
    jsonParser,
    validateBody(requestResetEmailSchema),
    ctrlWrapper(requestResetEmailController),
);

authRoutes.post(
    '/reset-pwd',
    jsonParser,
    validateBody(resetPasswordSchema),
    ctrlWrapper(resetPasswordController),
);

export default authRoutes;
