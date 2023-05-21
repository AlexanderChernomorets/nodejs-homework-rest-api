const Contact = require("../../models/contact");
const { RequestError } = require("../../helpers");

const updateById = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { id } = req.params;
    const { _id: owner } = req.user;

    if (!name && !email && !phone) {
      throw RequestError(400, "Missing fields");
    }

    const contactUpdate = await Contact.findOneAndUpdate(
      { id, owner },
      req.body,
      { new: true }
    );
    if (!contactUpdate) {
      throw RequestError(404, "Not found");
    }

    res.status(200).json(contactUpdate);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;