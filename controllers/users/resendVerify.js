const { RequestError } = require("../../helpers");
const User = require("../../models/user");

const resendVerify = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = User.findOne(email);

    if (!user) {
      throw RequestError(400, "verification has already been passed");
    }

    const mail = createEmail(email, user.verificationToken);
    await sendMail(mail);

    res.json({ message: "verification email sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerify;
