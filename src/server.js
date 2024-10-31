import express from "express";
import pino from 'pino-http';
import cors from 'cors';
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
// import contactsRouter from "./routers/contacts.js";
// import authRoutes from "./routers/auth.js";
import router from "./routers/index.js";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

export const setupServer = () => {
    const app = express();

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.use(cookieParser());
    app.use(cors());
    app.use('/', router);
    app.use(notFoundHandler);
    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

};