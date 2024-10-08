import express from "express";
import pino from 'pino-http';
import cors from 'cors';
import dotenv from "dotenv";
import * as contactServices from "./services/contacts.js";

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

    app.use(cors());

    app.get("/contacts", async (req, res) => {
        const data = await contactServices.getAllContacts();

        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data,
        });
    });

    app.get("/contacts/:contactId", async (req, res) => {
        const { contactId } = req.params;
        const data = await contactServices.getContactById(contactId);

        if (!data) {
            return res.status(404).json({
                message: 'Contact not found'
            });
        }

        res.json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data,
        });
    });

    app.use('*', (req, res, next) => {
        res.status(404).json({
            message: 'Not found',
        });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

};


// Створіть роут GET /contacts/:contactId, який буде повертати дані контакту за переданим ID або повертати помилку 404, якщо контакт не знайдено. Обробка цього роута має включати:

// Реєстрацію роута в файлі src/server.js
// Опис контролера для цього роута
// Створення сервісу в папці src/services у файлі з відповідним іменем сутності (в даному випадку contacts.js)
// Відповідь сервера, якщо контакт було знайдено, має бути зі статусом 200 та містити об’єкт з наступними властивостями:


// {
// 	status: 200,
// 	message: "Successfully found contact with id {contactId}!",
// 	data: {
// 		// об'єкт контакту
//       }
// }

// Додайте перевірку чи контакт за переданим ідентифікатором було знайдено. Якщо контакт не було знайдено, то поверніть відповідь зі статусом 404 і наступним об’єктом:

// {
// 	message: 'Contact not found',
// }

// На даному етапі не потрібно перевіряти невалідний MongoDB ID у цьому модулі. Припускаємо, що ID завжди валідний