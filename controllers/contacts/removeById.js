const Contact = require('../../models/contact');
const { RequestError } = require('../../helpers');

const removeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;

    const findContactById = await Contact.findOneAndRemove({ id, owner });

    if (!findContactById) {
      throw RequestError(404, "Not found");
    }

    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = removeById;