const Router = require('express')
const router = new Router();
const orderController = require('../controllers/orderController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', orderController.saveOrder)
router.get('/', orderController.getAll)
router.get('/items', orderController.getOrderItems)
router.delete('/:id', checkRole('ADMIN'), orderController.delete)

module.exports = router