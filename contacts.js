import path from "path";

const fs = require("fs").promises;

const contactsPath = path.resolve("./db/contacts.json");

export async function listContacts() {
  return fs
    .readFile(contactsPath)
    .then((data) => {
      return data.toString();
    })
    .catch((err) => {
      return err.message;
    });
}

export async function getContactById(contactId) {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath));
    const contact = data.find((c) => c.id === contactId);
    return contact ? contact : null;
  } catch (err) {
    return null;
  }
}

export async function removeContact(contactId) {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath));
    const updatedContacts = data.filter((c) => c.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    const deletedContact = data.find((c) => c.id === contactId);
    return deletedContact ? deletedContact : null;
  } catch (err) {
    return null;
  }
}

export async function addContact(name, email, phone) {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath));
    const newContact = { id: Date.now(), name, email, phone };
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return newContact;
  } catch (err) {
    return null;
  }
}
