const knex = require('../database/connection');
const encryptPassword = require('../utils/encryptPassword');
const validatePassword = require('../utils/validatePassword');

module.exports = {
    async index(request, response){
        const results = await knex('users');
        delete results.password;

        return response.json(results);
    },

    async create(request, response, next){
        const user = request.body
        try{
            if(validatePassword(user.password)){
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