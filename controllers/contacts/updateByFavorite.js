const Contact = require("../../models/contact");
const { RequestError } = require("../../helpers");

const updateByFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const { _id: owner } = req.user;

    if ((!name, !email, !phone)) {
      throw RequestError(400, "Missing fields");
    }

    const contactUpdate = await Contact.findByIdAndUpdate(
      { id, owner },
      req.body,
      {
        new: true,
      }
    );

    if (!contactUpdate) {
      throw RequestError(404, "Not found");
    }

    res.json(contactUpdate);
  } catch (error) {
    next(error);
  }
};

module.exports = updateByFavorite;