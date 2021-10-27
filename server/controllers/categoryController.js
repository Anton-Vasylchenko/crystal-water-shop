const { Category } = require('../models/models');
const ApiError = require('../error/ApiError');

class CategoryController {
    async getAll(req, res) {
        const categories = await await Category.findAll({
            order: [
                ['id', 'ASC']
            ],
        });
        return res.json(categories)
    }

    async getById(req, res) {
        const { id } = req.params;
        const category = await Category.findOne({
            where: { id }
        });
        return res.json(category);
    }

    async create(req, res) {
        const { name } = req.body
        const catName = await Category.create({ name })
        return res.json(catName)
    }

    async update(req, res, next) {
        const { name } = req.body
        const id = req.params.id;

        const updateName = await Category.update({ name }, { where: { id } })
        return res.json(updateName);
    }

    async delete(req, res) {
        const id = req.params.id;
        const delCat = await Category.destroy({ where: { id } });
        return res.json(delCat);
    }

}

module.exports = new CategoryController()