
const nodemailer = require('nodemailer');
const ApiError = require('../error/ApiError');

class SendController {

    // category: category,
    // _sort: sortBy,
    // _order: sortOrder

    async sendEmail(req, res) {
        const { name, phone } = req.body

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_FOR_MAILING,
                pass: process.env.PASS_FOR_EMAIL
            }
        });

        let mailOptions = {
            from: 'noreply@richpost.com',
            to: 'stdavinchi@gmail.com',
            subject: 'Замовлення на сайті',
            text: `
                Ім'я: ${name};
                Телефон: ${phone};
            `
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return error;
            } else {
                return 'Email sent: ' + info.response
            }
        });
    }

}

module.exports = new SendController()