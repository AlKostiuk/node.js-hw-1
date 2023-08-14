const { error } = require("node:console");


const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function read() {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}
function write(data) {
  return fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

async function listContacts() {
  const data = await read();

  return data;
}

async function getContactById(contactId) {
  const data = await read();
  return data.find((contact) => contact.id === contactId);
}

async function removeContact(contactId) {
  const data = await read();
  const removedContact = data.find((contact) => contact.id === contactId);
  if (!removedContact) {
    return null;
  }
  const updatedData = data.filter((contact) => contact.id !== contactId);
  await write(updatedData);
  return removedContact;
}

async function addContact(name, email, phone) {
  const data = await read();
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await write(data);
  return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,

  };