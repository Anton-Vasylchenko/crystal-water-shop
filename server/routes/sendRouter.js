const Router = require('express')
const router = new Router();
const sendController = require('../controllers/sendController');

router.post('/', sendController.sendEmail)

module.exports = router