import * as contactServices from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getAllContactsController = async (req, res, next) => {
  try {
    const data = await contactServices.getAllContacts();

    res.status(200).json({
      message: 'Successfully found contacts!',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const data = await contactServices.getContactById(contactId);

    if (!data) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(200).json({
      message: `Contact with id=${contactId} successfully found`,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getCreateContactController = async (req, res, next) => {
  const contact = await contactServices.getCreateContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a student!`,
    data: contact,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactServices.updateContact(
    { _id: contactId },
    req.body,
  );

  if (!result) {
    throw createHttpError(404, `Contact with id=${contactId} not found`);
  }

  res.json({
    status: 200,
    message: 'Contact patched successfully',
    data: result.data,
  });
};

export const getDeleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await contactServices.getDeleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, 'Student not found'));
    return;
  }
  res.status(204).json({
    status: 204,
    message: `Successfully deleted`,
  });
};
