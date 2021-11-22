const Router = require('express')
const router = new Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.saveOrder)
router.get('/', orderController.getAll)
router.get('/items', orderController.getOrderItems)

module.exports = router