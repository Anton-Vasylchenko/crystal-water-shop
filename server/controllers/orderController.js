const nodemailer = require('nodemailer');
const path = require('path');
const ApiError = require('../error/ApiError');
const productController = require('./productController');
const { OrdersItems, OrdersList } = require('../models/models');
const { uuid } = require('uuidv4');

class SendController {
    async saveOrder(req, res, next) {

        const itemsOrder = {};
        const orderId = uuid();
        let userId;

        for (let key in req.body) {
            const itemId = key.split('[')[0];
            const valueName = key.split('[')[1].slice(0, key.split('[')[1].length - 1);

            if (!itemsOrder[itemId]) {
                itemsOrder[itemId] = {};
            } else {
                itemsOrder[itemId][valueName] = req.body[key];
            }

            if (valueName === 'userId' && !userId) {
                userId = req.body[key];
            }
        }

        try {
            let totalAmount = 0;

            for (let key in itemsOrder) {
                const orderItems = await OrdersItems.create({
                    userId: itemsOrder[key].userId,
                    orderNumber: orderId,
                    goodsId: key,
                    count: itemsOrder[key].count,
                    name: itemsOrder[key].name,
                    price: itemsOrder[key].price,
                    img: itemsOrder[key].img
                });

                totalAmount += itemsOrder[key].price * itemsOrder[key].count
            }

            const order = await OrdersList.create({
                userId: userId,
                orderNumber: orderId,
                amount: totalAmount,
            });

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

        // тут треба замутити відправку листа!!!!!

        // все, що нижче - робоче

        // const { name,
        //     phone,
        //     totalPrice,
        //     emailMsg,
        //     itemsCount,
        //     idArray,
        //     orderNumber,
        //     userId
        // } = req.body

        // const goodsId = idArray.split(',');

        // let transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: process.env.EMAIL_FOR_MAILING,
        //         pass: process.env.PASS_FOR_EMAIL
        //     }
        // });

        // let mailOptions = {
        //     from: 'crystal.water.website@gmail.com',
        //     to: 'stdavinchi@gmail.com',
        //     subject: 'Замовлення на сайті',
        //     html: `
        //         <b>Ім'я:</b> ${name};<br>
        //         <b>Телефон:</b> ${phone};<br><br>
        //         ${emailMsg}<br>
        //         <b>Загальна сума:</b> ${totalPrice} грн.                
        //     `
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         return error;
        //     } else {
        //         return 'Email sent: ' + info.response
        //     }
        // });        

        // for (let i = 0; i < goodsId.length; i++) {
        //     productController.increaseRating(goodsId[i]);
        // }




    }

    async getAll(req, res) {
        let { userId, limit, page } = req.query;

        console.log('fsdfsdfsdf sdf dsfds fsdf sdf dsf dsf dsfsdfdsf ');
        console.log(userId)

        page = page || 1;
        limit = limit || 12;

        let offset = page * limit - limit;

        let orders;

        if (!userId) {
            orders = await OrdersList.findAndCountAll({
                limit, offset
            });
        }

        if (userId) {
            orders = await OrdersList.findAndCountAll({
                where: { userId },
                limit, offset
            });
        }

        return res.json(orders);
    }

    async getOrderItems(req, res) {
        let { orderId } = req.query;

        let orderItems = await OrdersItems.findAndCountAll({
            where: { orderNumber: orderId }
        });

        return res.json(orderItems);
    }

}

module.exports = new SendController()