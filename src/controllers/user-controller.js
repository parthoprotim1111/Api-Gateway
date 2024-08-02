const { userService } = require('../services');
const { errorRes, successRes } = require('../utils/common');
const { StatusCodes } = require('http-status-codes');

async function signUp(req, res) {
    try {
        const user = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        successRes.data = user;
        return res
            .status(StatusCodes.CREATED)
            .json(successRes);
    } catch (error) {
        console.error('Error in signUp:', error);
        errorRes.error = error.message || 'Internal Server Error';
        return res
            .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(errorRes);
    }
}

async function signIn(req, res) {
    try {
        const user = await userService.signIn({
            email: req.body.email,
            password: req.body.password
        });
        successRes.data = user;
        return res
            .status(StatusCodes.OK)  // Use OK status for successful login
            .json(successRes);
    } catch (error) {
        console.error('Error in signIn:', error);
        errorRes.error = error.message || 'Internal Server Error';
        return res
            .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(errorRes);
    }
}

module.exports = {
    signUp,
    signIn
};
