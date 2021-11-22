const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

const { Component } = require('../models/models')
const ApiError = require('../error/ApiError');

class ComponentController {
    async getAll(req, res) {
        const components = await await Component.findAll({
            order: [
                ['id', 'ASC']
            ],
        });
        return res.json(components)
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const component = await Component.findOne({
                where: { id }
            });
            return res.json(component);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getByName(req, res, next) {
        try {
            const { name } = req.params;
            console.log(name);
            const component = await Component.findAll({
                where: { componentName: name }, order: [
                    ['id', 'ASC']
                ],
            });
            return res.json(component);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const { title, text } = req.body
            const { img } = req.files

            let imgType = img.mimetype.split('/')[1];
            const fileType = img.mimetype.split('/')[0];

            if (fileType !== 'image') {
                next(ApiError.badRequest('Error! The file is not image!'))
                return;
            }

            if (imgType === 'svg+xml') {
                imgType = imgType.split('+')[0]
            }

            let fileName = uuid.v4() + "." + imgType

            img.mv(path.resolve(__dirname, '..', 'static/components', fileName))
            const component = await Component.create({ title, text, img: fileName })

            return res.json(component)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res) {
        try {
            const { title, text } = req.body
            const id = req.params.id;

            if (req.files) {
                const component = await Component.findOne({
                    where: { id }
                });
                const { img } = req.files

                let imgType = img.mimetype.split('/')[1];
                const fileType = img.mimetype.split('/')[0];

                if (fileType !== 'image') {
                    next(ApiError.badRequest('Error! The file is not image!'))
                    return;
                }

                if (imgType === 'svg+xml') {
                    imgType = imgType.split('+')[0]
                }

                let fileName = uuid.v4() + "." + imgType

                const imgPath = './static/components/' + component.img;
                fs.unlinkSync(imgPath)

                img.mv(path.resolve(__dirname, '..', 'static/components', fileName))
                const updateComponent = await Component.update({ title, text, img: fileName }, { where: { id } })

                return res.json(updateComponent);
            }

            const updateComponent = await Component.update({ title, text }, { where: { id } })
            return res.json(updateComponent);
        } catch (e) {
            next(ApiError.badRequest('Error!'))
        }
    }

    async delete(req, res) {
        const id = req.params.id;
        const component = await Component.findOne({
            where: { id }
        });
        const img = component.img
        const imgPath = './static/components/' + img;

        try {
            const delComponent = await Component.destroy({ where: { id } });
            fs.unlinkSync(imgPath)
            return res.json(delComponent);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new ComponentController()