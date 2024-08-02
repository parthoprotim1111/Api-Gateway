const crudRepository= require('./crud-repository')
const { User } = require('../models')


class userRepository extends crudRepository{
    constructor(){
        super(User)
    }

    async getUserEmail(email){
        const user= await User.findOne({
            where: {
                email:email
            }
        })
        return user;
    }
}


module.exports= userRepository