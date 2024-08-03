const express= require('express');
const {userController}= require('../../controllers');
const {userMiddleware}=require('../../middlewares')


const router= express.Router()


router.post('/signup',userMiddleware.validateCreateRequest,userController.signUp)
router.post('/signin',userMiddleware.validateCreateRequest,userController.signIn)
router.post('/role',userMiddleware.checkAuth,userMiddleware.isAdmin,userController.addRoleUser)


module.exports=router;