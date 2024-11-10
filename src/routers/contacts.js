import express from 'express';
import { createContactController, deleteContactController, getContactController, getContactcsController, patchContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactPatchSchema, contactPostSchema } from '../validation/contact.js';
import { upload } from '../middlewares/upload.js';

const contactsRouter = express.Router();
const jsonParser = express.json({ type: 'application/json', });

contactsRouter.get('/', ctrlWrapper(getContactcsController));

contactsRouter.get('/:id', isValidId, ctrlWrapper(getContactController));

contactsRouter.post('/', upload.single("photo"), jsonParser, validateBody(contactPostSchema), ctrlWrapper(createContactController));

contactsRouter.patch('/:id', upload.single("photo"), isValidId, jsonParser, validateBody(contactPatchSchema), ctrlWrapper(patchContactController));

contactsRouter.delete('/:id', isValidId, ctrlWrapper(deleteContactController));

export default contactsRouter;
