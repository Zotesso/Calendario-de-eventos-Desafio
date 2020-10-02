const knex = require('../database/connection');

module.exports = async function verifyIfEventExists(title, userId){
        try{
                const results = await knex('events')
                .where({
                    'title': title,
                    'user_id': userId
                })
                .select('id');

                if(results[0] === undefined){
                        return false;

                }else{
                        return true;
                }
        }catch(error){
                return 'Erro! Oops';
        }
}