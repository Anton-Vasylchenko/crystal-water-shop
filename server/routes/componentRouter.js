const Router = require('express')
const router = new Router();
const componentController = require('../controllers/componentController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/', componentController.getAll)
router.get('/:id', componentController.getById)
router.get('/getByName/:name', componentController.getByName)
router.patch('/:id', componentController.update)
router.post('/', componentController.create)
router.delete('/', componentController.delete)

// checkRole('ADMIN'), 

module.exports = router