const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

const { Product } = require('../models/models')
const { Component } = require('../models/models')
const ApiError = require('../error/ApiError');

class ProductController {

    // category: category,
    // _sort: sortBy,
    // _order: sortOrder

    async getAll(req, res) {
        let { sortOrder, sortBy, categoryId, limit, page } = req.query;

        page = page || 1;
        limit = limit || 12;

        let offset = page * limit - limit;

        let products;

        if (!categoryId) {
            products = await Product.findAndCountAll({
                limit, offset, order: [
                    [sortBy, sortOrder]
                ],
            });
        }

        if (categoryId) {
            products = await Product.findAndCountAll({
                where: { categoryId },
                limit, offset, order: [
                    [sortBy, sortOrder]
                ],
            });
        }

        return res.json(products);
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const product = await Product.findOne({
                where: { id }
            });
            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const { name, price, categoryId, description } = req.body
            const { img } = req.files

            const imgType = img.mimetype.split('/')[1];
            const fileType = img.mimetype.split('/')[0];
            let fileName = uuid.v4() + "." + imgType

            if (fileType !== 'image') {
                next(ApiError.badRequest('Error! The file is not image!'))
                return;
            }

            img.mv(path.resolve(__dirname, '..', 'static/products', fileName))
            const product = await Product.create({ name, price, categoryId, description, img: fileName })

            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const { name, price, categoryId, description } = req.body
            const id = req.params.id;

            if (req.files) {
                const product = await Product.findOne({
                    where: { id }
                });
                const { img } = req.files

                const imgType = img.mimetype.split('/')[1];
                const fileType = img.mimetype.split('/')[0];
                let fileName = uuid.v4() + "." + imgType

                if (fileType !== 'image') {
                    next(ApiError.badRequest('Error! The file is not image!'))
                    return;
                }

                const imgPath = './static/products/' + product.img;
                fs.unlinkSync(imgPath)

                img.mv(path.resolve(__dirname, '..', 'static/products', fileName))
                const updateProduct = await Product.update({ name, price, categoryId, description, img: fileName }, { where: { id } })

                return res.json(updateProduct);
            }

            const updateProduct = await Product.update({ name, price, categoryId, description }, { where: { id } })
            return res.json(updateProduct);
        } catch (e) {
            next(ApiError.badRequest('Error!'))
        }
    }

    async delete(req, res, next) {
        const id = req.params.id;
        const product = await Product.findOne({
            where: { id }
        });
        const img = product.img
        const imgPath = './static/products/' + img;

        try {
            const delProduct = await Product.destroy({ where: { id } });
            fs.unlinkSync(imgPath)
            return res.json(delProduct);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ProductController()