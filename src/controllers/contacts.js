import createHttpError from 'http-errors';
import { createContact, deleteContact, getAllContacts, getContactById, updateContact } from "../services/contacts.js";
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { sortFields } from '../utils/parseSortParams.js';

export const getContactcsController = async (req, res) => {
    const { perPage, page } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFields });
    console.log("userId from request:", req.user._id);

    const contacts = await getAllContacts({
        perPage, page, sortBy,
        sortOrder,
        userId: req.user._id,
    });

    res.json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts,
    });
};

export const getContactController = async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user._id;

    const contact = await getContactById(id, userId);

    if (contact === null) {
        return next(new createHttpError.NotFound("Contact not found"));
    }

    if (contact.userId.toString() !== userId.toString()) {

        return next(new createHttpError.NotFound('Contact not found'));
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${id}!`,
        data: contact,
    });
};

export const createContactController = async (req, res) => {
    const userId = req.user._id;
    const contact = await createContact({...req.body, userId});

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data: contact,
    });
};

export const patchContactController = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const userId = req.user._id;
    const result = await updateContact(id, userId,updateData);

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
    const userId = req.user._id;
    const result = await deleteContact(id, userId);

    if (result === null) {
        throw createHttpError(404, 'Contact not found');
    }
    res.status(204).send();
};

