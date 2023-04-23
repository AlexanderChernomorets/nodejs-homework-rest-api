const express = require("express");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const RequestError = require("../../helpers/RequestError");
const { bodySchema } = require("../../schemas/contacts");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contactById = await getContactById(contactId);

    if (!contactById) {
      throw RequestError(404, "Not Found");
    }

    res.json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const validation = bodySchema.validate(req.body);
    const body = req.body;

    if (validation.error) {
      throw RequestError(404, "Missing required name field");
    }

    const newContact = await addContact(body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const findContactById = await removeContact(contactId);

    if (!findContactById) {
      throw RequestError(404, "Not Found");
    }

    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const validation = bodySchema.validate(req.body);
    if (validation.error) {
      return res.status(400).json({ status: validation.error.details });
    }

    const contactId = req.params.contactId;
    const body = req.body;

    if (body === null) {
      throw RequestError(400, "Missing fields");
    }

    const contactUpdate = await updateContact(contactId, body);
    if (!contactUpdate) {
      throw RequestError(404, "Not Found");
    }

    res.status(200).json(contactUpdate);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
