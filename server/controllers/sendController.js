
const nodemailer = require('nodemailer');
const path = require('path');
const ApiError = require('../error/ApiError');
const productController = require('../controllers/productController');

class SendController {
    async sendEmail(req, res) {
        const { name, phone, totalPrice, items, idArray } = req.body

        const goodsId = idArray.split(',');

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_FOR_MAILING,
                pass: process.env.PASS_FOR_EMAIL
            }
        });

        let mailOptions = {
            from: 'crystal.water.website@gmail.com',
            to: 'kryshtalevavoda@gmail.com',
            subject: 'Замовлення на сайті',
            html: `
                <b>Ім'я:</b> ${name};<br>
                <b>Телефон:</b> ${phone};<br><br>
                ${items}<br>
                <b>Загальна сума:</b> ${totalPrice} грн.                
            `
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return error;
            } else {
                return 'Email sent: ' + info.response
            }
        });

        for (let i = 0; i < goodsId.length; i++) {
            productController.increaseRating(goodsId[i]);
        }

    }

    async saveOrder() {
        try {

            img.mv(path.resolve(__dirname, '..', 'static/products', fileName))
            const product = await Product.create({ name, price, categoryId, description, img: fileName })

            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new SendController()