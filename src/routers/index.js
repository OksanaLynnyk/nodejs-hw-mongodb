import express from 'express';
import authRoutes from './auth.js';
import contactsRouter from './contacts.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/contacts', authenticate, contactsRouter);

export default router;