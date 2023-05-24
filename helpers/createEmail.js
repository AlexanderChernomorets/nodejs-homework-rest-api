const { BASE_URL } = process.env;

const createEmail = (email, verificationToken) => {
    const mail = {
        to: email,
        subject: "Let's verify your email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/:${verificationToken}">Verify email</a>`
    }

    return mail;
}

module.exports = createEmail;