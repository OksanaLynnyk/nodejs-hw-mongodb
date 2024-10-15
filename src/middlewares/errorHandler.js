import { isHttpError } from 'http-errors';

export function errorHandler(error, req, res, next) {
    if (isHttpError(error) === true) {
        return res
            .status(error.statusCode)
            .json({ status: error.statusCode, message: "Something went wrong", data: error.message });
    }

    res.status(500).send({ status: 500, message: 'Internal Server Error' });
}