const Router = require('express')
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/', userController.getAll)
router.patch('/:id', userController.updateRole)
router.patch('/updateUser/:id', userController.updateUser)
router.post('/changePassword', userController.changePassword)
router.delete('/:id', checkRole('ADMIN'), userController.delete)

router.post('/forgotPassword', userController.forgotPassword)
router.post('/resetPassword/:id/:token', userController.resetPassword)

module.exports = router