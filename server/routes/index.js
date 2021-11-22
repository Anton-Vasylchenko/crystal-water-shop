const Router = require('express')
const router = new Router();

const advantagesRouter = require('./advantagesRouter');
const categoryRouter = require('./categoryRouter');
const productRouter = require('./productRouter');
const userRouter = require('./userRouter');
const componentRouter = require('./componentRouter');
const orderRouter = require('./orderRouter');

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/advantages', advantagesRouter)
router.use('/component', componentRouter)
router.use('/product', productRouter)
router.use('/order', orderRouter)

module.exports = router