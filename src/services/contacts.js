import { Contact } from "../db/models/contacts.js";

export const getAllContacts = () => Contact.find();

export const getContactById = contactId => Contact.findById(contactId);

export const createContact = payload => Contact.create(payload);

export const updateContact = async (contactId, updateData) => {
    const contact = await Contact.findByIdAndUpdate(contactId,
        updateData,
        { new: true },
    );
    return contact;
};

export const deleteContact = async contactId => Contact.findByIdAndDelete(contactId);