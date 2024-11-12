import express from "express";
import pino from 'pino-http';
import cors from 'cors';
import dotenv from "dotenv";
import path from "node:path";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import router from "./routers/index.js";
import cookieParser from "cookie-parser";
import { swaggerDocs } from "./middlewares/swaggerDocs.js";


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
    app.use("/photos", express.static(path.resolve("src", "public/photos")));
    app.use(cookieParser());
    app.use(cors());
    app.use('/', router);
    app.use('/api-docs', swaggerDocs());
    app.use(notFoundHandler);
    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

};