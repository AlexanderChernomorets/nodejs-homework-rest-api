const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const getContacts = JSON.parse(data);

  return getContacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find(
    (contact) => String(contact.id) === String(contactId)
  );

  return contactById || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const updateContacts = contacts.filter(
    (contact) => String(contact.id) !== String(contactId)
  );

  await fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2));

  return contacts.find((contact) => String(contact.id) === String(contactId));
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (contact) => String(contact.id) === String(contactId)
  );
  if (index === -1) {
    return null;
  }

  const contactUpdate = { ...contacts[index], ...body };

  await fs.writeFile(
    contactsPath,
    JSON.stringify([...contacts, contactUpdate], null, 2)
  );
  return contactUpdate;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
