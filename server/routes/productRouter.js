const Router = require('express')
const router = new Router();
const productController = require('../controllers/productController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), productController.create)
router.get('/', productController.getAll)
router.get('/:id', productController.getById)
router.get('/byCategory/:id', productController.getProductByCatId)
router.patch('/:id', productController.update)
router.delete('/:id', checkRole('ADMIN'), productController.delete)

// checkRole('ADMIN'),

module.exports = router