const { RequestError } = require("../../helpers");
const User = require("../../models/user");

const verify = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = User.findOne({ verificationToken });

    if (!user) {
      throw RequestError(404, "User not found");
    }

    await User.findByIdAndUpdate(user._id, {
      verificationToken: null,
      verify: true,
    });

    res.json({ message: "verification successful" });
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
