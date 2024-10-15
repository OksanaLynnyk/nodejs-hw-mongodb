import express from 'express';
import { createContactController, deleteContactController, getContactController, getContactcsController, patchContactController} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = express.Router();
const jsonParser = express.json({ type: 'application/json', });

contactsRouter.get('/', ctrlWrapper(getContactcsController));

contactsRouter.get('/:id', ctrlWrapper(getContactController));

contactsRouter.post('/', jsonParser, ctrlWrapper(createContactController));

contactsRouter.patch('/:id', jsonParser, ctrlWrapper(patchContactController));

contactsRouter.delete('/:id', ctrlWrapper(deleteContactController));

export default contactsRouter;
