const nodemailer = require("nodemailer")

const sendEmail = async (email, subject,text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 587,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            },
        });
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            html:text
        });
    } catch (error) {
        console.log(error, "email not sent", error.stack);
    }
};

module.exports = sendEmail;