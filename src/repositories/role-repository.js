const crudRepository= require('./crud-repository')
const { Role } = require('../models')


class roleRepository extends crudRepository{
    constructor(){
        super(Role)
    }

    async getRoleByName(name){
        const role= await Role.findOne({
            where: {
                name:name
            }
        })
        return role;
    }
}


module.exports= roleRepository;