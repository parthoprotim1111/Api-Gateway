const express = require('express');

const { InfoController } = require('../../controllers');
const userRouter= require('./user-route');
const {userMiddleware} = require('../../middlewares')
const router = express.Router();

router.get('/info',userMiddleware.checkAuth ,InfoController.info);

router.use('/user',userRouter)

module.exports = router;