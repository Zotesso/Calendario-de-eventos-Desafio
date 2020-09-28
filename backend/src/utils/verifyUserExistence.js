const knex = require('../database/connection');

module.exports = async function verifyUserExistence(username){
        try{
                const results = await knex('users')
                                .where('username', username)
                                .select('password');

                if(results != []){
                        return results[0].password;
                }else{
                        return 'Usuário inexistente';
                }
        }catch(error){
                return 'Erro! Oops';
        }
}