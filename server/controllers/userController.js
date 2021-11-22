const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const { User } = require('../models/models');

const generateJwt = (id, email, role, name, image, phone) => {
    return jwt.sign(
        { id, email, role, name, image, phone },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {
    async registration(req, res, next) {
        const { email, password, name, role } = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Password or email is not correct'))
        }

        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            return next(ApiError.badRequest('User with this email already exists'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ email, role, name, password: hashPassword })
        const token = generateJwt(user.id, user.email, user.role, user.name, user.image)
        return res.json({ token })
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.internal('User is not exists'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Password is not correct'))
        }

        const token = generateJwt(user.id, user.email, user.role, user.name, user.image, user.phone)
        return res.json({ token })
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.name, req.user.image, req.user.phone);
        return res.json({ token })
    }

    async getAll(req, res) {
        let { limit, page } = req.query;

        page = page || 1;
        limit = limit || 30;

        let offset = page * limit - limit;

        let users;

        users = await User.findAndCountAll({
            limit, offset, order: ['id']
        });
        return res.json(users);
    }

    async updateRole(req, res, next) {
        try {
            const { role } = req.body
            const id = req.params.id;

            // if (req.files) {
            //     const product = await Product.findOne({
            //         where: { id }
            //     });
            //     const { img } = req.files

            //     const imgType = img.mimetype.split('/')[1];
            //     const fileType = img.mimetype.split('/')[0];
            //     let fileName = uuid.v4() + "." + imgType

            //     if (fileType !== 'image') {
            //         next(ApiError.badRequest('Error! The file is not image!'))
            //         return;
            //     }

            //     const imgPath = './static/products/' + product.img;
            //     fs.unlinkSync(imgPath)

            //     img.mv(path.resolve(__dirname, '..', 'static/products', fileName))
            //     const updateProduct = await Product.update({ name, price, categoryId, description, img: fileName }, { where: { id } })

            //     return res.json(updateProduct);
            // }

            const updateUser = await User.update({ role }, { where: { id } })

            return res.json(updateUser);
        } catch (e) {
            next(ApiError.badRequest('Error!'))
        }
    }

    async updateUser(req, res, next) {
        try {
            const { name, phone, email } = req.body
            const id = req.params.id;

            const user = await User.findOne({
                where: { id }
            });

            if (req.files) {

                const { image } = req.files

                const imgType = image.mimetype.split('/')[1];
                const fileType = image.mimetype.split('/')[0];
                let fileName = uuid.v4() + "." + imgType

                if (fileType !== 'image') {
                    next(ApiError.badRequest('Error! The file is not image!'))
                    return;
                }

                if (!user.image) {
                    const imgPath = './static/users/' + user.image;
                    fs.unlinkSync(imgPath)
                }

                image.mv(path.resolve(__dirname, '..', 'static/users', fileName))
                const updateUser = await User.update({ name, phone, email, image: fileName }, { where: { id } })

                const token = generateJwt(id, email, user.role, name, fileName, phone)
                return res.json({ token })
            }

            const updateUser = await User.update({ name, phone, email }, { where: { id } })

            const token = generateJwt(id, email, user.role, name, user.image, phone)

            return res.json({ token })
        } catch (e) {
            next(ApiError.badRequest('Error!'))
        }
    }
}

module.exports = new UserController()