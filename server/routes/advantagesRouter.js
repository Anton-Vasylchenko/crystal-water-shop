const Router = require('express')
const router = new Router();
const advantagesController = require('../controllers/advantagesController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', advantagesController.create)
router.get('/', advantagesController.getAll)
router.get('/:id', advantagesController.getById)
router.patch('/:id', advantagesController.update)
router.delete('/:id', advantagesController.delete)

// checkRole('ADMIN')

module.exports = router
