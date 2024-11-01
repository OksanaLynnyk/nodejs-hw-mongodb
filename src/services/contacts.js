import { Contact } from "../db/models/contacts.js";
import { SORT_ORDER } from "../utils/parseSortParams.js";

export const getAllContacts = async ({ perPage, page, sortBy = "_id", sortOrder = SORT_ORDER[0], userId, }) => {
    const skip = (page - 1) * perPage;
    const contactQuery = Contact.find();
    contactQuery.where('userId').equals(userId);

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

export const getContactById = (contactId, userId) => Contact.findOne({ _id: contactId, userId });

export const createContact = payload => Contact.create(payload);

export const updateContact = async (contactId, userId, updateData) => {
    const contact = await Contact.findOneAndUpdate({ _id: contactId, userId },
        updateData,
        { new: true },
    );
    return contact;
};

export const deleteContact = (contactId, userId) => Contact.findOneAndDelete({ _id: contactId, userId });