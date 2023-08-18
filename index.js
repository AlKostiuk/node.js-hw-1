

const contacts = require("./contacts.js");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contact = await contacts.listContacts();
      return contact;
    case "get":
      const contactId = await contacts.getContactById(id);
      return contactId;
    case "add":
      const newContact = await contacts.addContact( name, email, phone );
      return newContact;
    case "remove":
      const removeContact = await contacts.removeContact(id);
      return removeContact;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

(async () => {
    const result = await invokeAction(argv);
    console.table(result);
  })();