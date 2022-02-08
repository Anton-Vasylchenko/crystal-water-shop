const nodemailer = require('nodemailer');
const path = require('path');
const ApiError = require('../error/ApiError');
const productController = require('./productController');
const { OrdersItems, OrdersList } = require('../models/models');

function emailTemplate(obj) {
    let order = `<table style="border: 1px solid black">    
      <tr style="border: 1px solid black">
        <th>Назва</th>
        <th>Кількість</th>
        <th>Ціна за шт.</th>
      </tr>`
    for (let key in obj) {
        order += `
            <tr>
                <td style="border: 1px solid black">${obj[key].name}</td>
                <td style="border: 1px solid black">${obj[key].count} шт.</td>
                <td style="border: 1px solid black">${obj[key].price} грн.</td>
            </tr>`
    }
    order += `</table>`;
    return order;
}

function sendOrderEmail(
    userName,
    userEmail,
    userPhone,
    orderId,
    totalAmount,
    ordersTable,
    recipientEmail
) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_FOR_MAILING,
            pass: process.env.PASS_FOR_EMAIL
        }
    });

    let mailOptions = {
        from: 'crystal.water.website@gmail.com',
        to: recipientEmail,
        subject: 'Замовлення на сайті water.lviv.ua',
        html: `
            <b>Номер замовлення: </b> ${orderId};<br>
            <b>Ім'я:</b> ${userName};<br>
            <b>Телефон:</b> ${userPhone};<br>
            <b>Email:</b> ${userEmail};<br>
            <br>
            ${ordersTable}<br>
            <b>Загальна сума:</b> ${totalAmount} грн.                
        `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
            return error;

        } else {
            return 'Email sent: ' + info.response
        }
    });
}

class SendController {
    async saveOrder(req, res, next) {

        const itemsOrder = {};
        const goodsIds = [];
        let totalAmount = 0;
        let userName;
        let userEmail;
        let userPhone;
        const orderId = Math.trunc(Date.now() + Math.random());
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

                userName = itemsOrder[key].userName
                userPhone = itemsOrder[key].userPhone
                userEmail = itemsOrder[key].userEmail

                goodsIds.push(key)
            }

            const order = await OrdersList.create({
                userId: userId,
                orderNumber: orderId,
                amount: totalAmount,
                userName,
                userPhone,
                userEmail
            });

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

        for (let i = 0; i < goodsIds.length; i++) {
            productController.increaseRating(goodsIds[i]);
        }

        const ordersTable = emailTemplate(itemsOrder);

        sendOrderEmail(
            userName,
            userEmail,
            userPhone,
            orderId,
            totalAmount,
            ordersTable,
            process.env.EMAIL_FOR_ORDERS
        );

        sendOrderEmail(
            userName,
            userEmail,
            userPhone,
            orderId,
            totalAmount,
            ordersTable,
            userEmail
        );
    }

    async getAll(req, res) {
        let { userId, limit, page } = req.query;

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

    async delete(req, res, next) {
        const id = req.params.id;

        const order = await OrdersList.findOne({
            where: { id }
        });

        try {
            const delOrder = await OrdersList.destroy({ where: { id } });
            const delOrderItems = await OrdersItems.destroy({ where: { orderNumber: order.orderNumber } });

            return res.json(delOrder);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new SendController()