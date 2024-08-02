const { StatusCodes } = require('http-status-codes');
const {userRepository}= require('../repositories');
const AppError = require('../utils/errors/app-error');

const userRepo= new userRepository()

async function create(data) {
    try {
        const user= await userRepo.create(data);
        return user;

    } catch (error) {
        if(error.name=='SequelizeValidationError' || error.name=='SequelizeUniqueConstraintError'){
            let explain=[];
            error.errors.forEach((err)=>{
                explain.push(err.message);
            });
            throw new AppError(explain,StatusCodes.BAD_REQUEST);

        }
        throw new AppError('Cannot create user',StatusCodes.INTERNAL_SERVER_ERROR);

        
    }

    
}




module.exports={
    create

}