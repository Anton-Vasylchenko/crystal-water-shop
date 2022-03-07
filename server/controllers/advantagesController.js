const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

const { Advantages } = require('../models/models')
const ApiError = require('../error/ApiError');

class AdvantagesController {
    async getAll(req, res) {
        const advantages = await await Advantages.findAll({
            order: [
                ['id', 'ASC']
            ],
        });
        return res.json(advantages)
    }

    async getById(req, res) {
        const { id } = req.params;
        const advantage = await Advantages.findOne({
            where: { id }
        });

        return res.json(advantage);
    }

    async create(req, res, next) {
        console.log('ssssssssssssssssssssssssssssssssssss');
        try {
            console.log('ffffffffffffffffffffffffffffffffffffffffffffffffff');

            const { title } = req.body
            const { img } = req.files

            console.log('ffffffffffffffffffffffffffffffffffffffffffffffffff');

            console.log(title)
            console.log(img)

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

            img.mv(path.resolve(__dirname, '..', 'static/advantages', fileName))
            const advantage = await Advantages.create({ title, img: fileName })

            return res.json(advantage)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const { title } = req.body
            const id = req.params.id;

            if (req.files) {
                const advantage = await Advantages.findOne({
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

                const imgPath = './static/advantages/' + advantage.img;
                fs.unlinkSync(imgPath)

                img.mv(path.resolve(__dirname, '..', 'static/advantages', fileName))
                const updateAdvantage = await Advantages.update({ title, img: fileName }, { where: { id } })

                return res.json(updateAdvantage);
            }

            const updateAdvantage = await Advantages.update({ title }, { where: { id } })
            return res.json(updateAdvantage);
        } catch (e) {
            next(ApiError.badRequest('Error!'))
        }
    }

    async delete(req, res) {
        const id = req.params.id;

        const advantage = await Advantages.findOne({
            where: { id }
        });

        const img = advantage.img
        const imgPath = './static/advantages/' + img;

        try {
            const delAdvantage = await Advantages.destroy({ where: { id } });
            fs.unlinkSync(imgPath)
            return res.json(delAdvantage);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new AdvantagesController()