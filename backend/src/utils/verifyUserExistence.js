const knex = require('../database/connection');

module.exports = async function verifyUserExistence(username){
        const results = await knex('users')
                        .where('username', username)
                        .select('password');

        return results[0];
}