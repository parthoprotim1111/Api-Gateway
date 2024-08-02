const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const {userService}= require('../services')
function validateCreateRequest(req, res, next) {
    // Initialize or create a new error response object
    const errorRes = {
        success: false,
        message: '',
        error: null,
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email
    if (!req.body.email || !emailRegex.test(req.body.email)) {
        errorRes.message = 'Validation failed';
        errorRes.error = new AppError(
            ['Email not provided or not in the correct format'],
            StatusCodes.BAD_REQUEST
        );
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(errorRes);
    }

    // Validate password
    if (!req.body.password) {
        errorRes.message = 'Validation failed';
        errorRes.error = new AppError(
            ['Password not provided or not in the correct format'],
            StatusCodes.BAD_REQUEST
        );
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(errorRes);
    }

    // If validation passes, proceed to the next middleware or route handler
    next();
}


async function checkAuth(req, res, next) {
    try {
        const response = await userService.isAuthenticated(req.headers['x-access-token']);
        if (response) {
            req.user = response;
            next();
        }
    } catch (error) {
        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(error);
    }
}




module.exports = {
    validateCreateRequest,
    checkAuth
};
