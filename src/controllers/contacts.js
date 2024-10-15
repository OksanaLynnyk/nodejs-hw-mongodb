import createHttpError from 'http-errors';
import { createContact, deleteContact, getAllContacts, getContactById, updateContact } from "../services/contacts.js";

export const getContactcsController = async (req, res) => {
    const contacts = await getAllContacts();

    res.json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts,
    });
};

export const getContactController = async (req, res, next) => {
    const { id } = req.params;
    const contact = await getContactById(id);

    if (contact === null) {
        return next(new createHttpError.NotFound("Contact not found"));
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${id}!`,
        data: contact,
    });
};

export const createContactController = async (req, res) => {
    const contact = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data: contact,
    });
};

export const patchContactController = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    const result = await updateContact(id, updateData);

    if (result === null) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: result,
    });
};

export const deleteContactController = async (req, res) => {
    const { id } = req.params;
    const result = await deleteContact(id);

    if (result === null) {
        throw createHttpError(404, 'Contact not found');
    }
    res.status(204).send();
};

