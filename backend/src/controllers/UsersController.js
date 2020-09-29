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
     
        let message = "Cadastro Realizado";

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
                .catch((err) => console.log(err))
            }else{
                response.json({error:'invalid password'});
            }
            return response.json(message);
        }catch(error){
            next(error);
        }
    }
}