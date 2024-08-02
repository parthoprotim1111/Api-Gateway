const {userService}= require('../services')
const {errorRes,successRes} = require('../utils/common')
const {StatusCodes} = require('http-status-codes')


async function signUp(req,res) {
    try {
        const user=await userService.create({
            email: req.body.email,
            password: req.body.password

        });
        successRes.data=user;
        return res
                .status(StatusCodes.CREATED)
                .json(successRes);

        
    } catch (error) {
        errorRes.error=error;
        return res
                .status(error.StatusCodes)
                .json(errorRes)
        
    }
    
}


module.exports={
    signUp
}