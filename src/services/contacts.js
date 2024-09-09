import ContactCollection from '../db/Contacts.js';

export const getAllContacts = async () => {
  const contacts = await ContactCollection.find();
  return contacts;
};
export const getContactById = async (id) => {
  const contacts = await ContactCollection.findById(id);
  return contacts;
};
export const getCreateContact = async (playload) => {
  const contacts = await ContactCollection.create(playload);
  return contacts;
};

export const getDeleteContact = async (id) => {
  const contacts = await ContactCollection.findOneAndDelete(id);
  console.log(contacts);
  return contacts;
};
