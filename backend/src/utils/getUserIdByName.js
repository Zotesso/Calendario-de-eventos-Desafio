const knex = require('../database/connection');

module.exports = async function getUserIdByName(username){
        try{
                const results = await knex('users')
                                .where('username', username)
                                .select('id');

                if(results != []){
                        return results[0].id;
                }else{
                        return 'Usuário inexistente';
                }
        }catch(error){
                return 'Erro! Oops';
        }
}