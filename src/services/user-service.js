const { StatusCodes } = require('http-status-codes');
const {userRepository}= require('../repositories');

const {auth}= require('../utils/common')
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

async function signIn(data) {
    try {
        const user= await userRepo.getUserEmail(data.email);
        if(!user){
            throw new AppError("No user found", StatusCodes.NOT_FOUND)
        }
        const passwordMatch = auth.checkPass(data.password,user.password);
        if(!passwordMatch){
            throw new AppError("Invalid Password", StatusCodes.BAD_REQUEST);

        }

        const jwt= auth.createToken({id:user.id, email:user.email});
        return jwt;

        
    } catch (error) {
        if(error instanceof AppError) throw error;
        console.log(error);
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
    
}








module.exports={
    create,
    signIn

}