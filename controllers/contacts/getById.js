const Contact = require("../../models/contact");
const { RequestError } = require("../../helpers");

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const contactById = await Contact.findOne({ id, owner });

    if (!contactById) {
      throw RequestError(404, "Not found");
    }

    res.json(contactById);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;