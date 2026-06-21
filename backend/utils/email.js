const nodemailer =
require("nodemailer");

const sendEmail = async (
    to,
    subject,
    text
) => {

    const transporter =
    nodemailer.createTransport({

        service: "gmail",

        auth: {
            user: "yourgmail@gmail.com",
            pass: "your_app_password"
        }
    });

    await transporter.sendMail({

        from: "NayePankh Foundation",

        to,

        subject,

        text
    });
};

module.exports = sendEmail;