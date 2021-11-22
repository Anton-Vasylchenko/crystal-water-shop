const Router = require('express')
const router = new Router();
const advantagesController = require('../controllers/advantagesController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), advantagesController.create)
router.get('/', advantagesController.getAll)
router.get('/:id', advantagesController.getById)
router.patch('/:id', checkRole('ADMIN'), advantagesController.update)
router.delete('/:id', checkRole('ADMIN'), advantagesController.delete)

// checkRole('ADMIN')

module.exports = router
