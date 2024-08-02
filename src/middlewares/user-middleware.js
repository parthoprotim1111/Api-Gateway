const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

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

module.exports = {
    validateCreateRequest
};
