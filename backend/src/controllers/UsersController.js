const knex = require('../database/connection');
const encryptPassword = require('../utils/encryptPassword');
const validateUser = require('../utils/validateUser');

module.exports = {
    async index(request, response){
        const results = await knex('users')
        return response.json(results);
    },

    async create(request, response, next){
        const user = request.body
        try{
            if(validateUser(user.password)){
                encryptPassword(user.password, 8).then((hash) => {
                    delete user.password;
                    user.password_digest = hash
                })
                .then(() => knex('users').insert({
                    name: user.name,
                    username: user.username,
                    password: user.password_digest
                }))
                .catch((err) => console.error(err))

                return response.status(201).send();
            }else{
                response.json({error:'invalid password'});
            }
        }catch(error){
            next(error);
        }
    }
}