require("dotenv").config();

const nodemailer = require("nodemailer");

const sendEmail = async (email, emailBody, subject) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, 
            auth: {
              user: process.env.SENDGRID_USERNAME, // generated ethereal user
              pass: process.env.SENDGRID_PASSWORD, // generated ethereal password
            },
          });

        await transporter.sendMail({
            from: "Monitor App",
            to: email,
            subject: subject,
            text: emailBody,
        });

        return true;
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;