import { Contact } from "../db/models/contacts.js";
import { SORT_ORDER } from "../utils/parseSortParams.js";

export const getAllContacts = async ({ perPage, page, sortBy = "_id", sortOrder = SORT_ORDER[0], }) => {
    const skip = (page - 1) * perPage;
    const contactQuery = Contact.find();

    const [total, contacts] = await Promise.all([
        Contact.countDocuments(contactQuery),
        contactQuery
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(perPage),
    ]);

    const totalPages = Math.ceil(total / perPage);

    return {
        contacts,
        page,
        perPage,
        totalPages,
        totalItems: total,
        hasNextPage: totalPages - page > 0,
        hasPreviousPage: page > 1,
    };
};

export const getContactById = contactId => Contact.findById(contactId);

export const createContact = payload => Contact.create(payload);

export const updateContact = async (contactId, updateData) => {
    const contact = await Contact.findByIdAndUpdate(contactId,
        updateData,
        { new: true },
    );
    return contact;
};

export const deleteContact = contactId => Contact.findByIdAndDelete(contactId);