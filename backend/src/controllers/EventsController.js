const knex = require("../database/connection");
const authenticateToken = require("../utils/authenticateToken");

module.exports = {
    async index(request, response, next){
        const { visibility, id } = request.params;

        if(!visibility){
            return response.status(400).json({
                error: "Missing filters to search events"
            })
        }

        if(visibility === 'public'){
            const events = await knex('events')
            .where('visibility',visibility)
            .select(['events.*']);

            return response.json(events);

        }else if(visibility === 'private'){

            if(!id){
                return response.status(400).json({
                    error: "Missing filters to search events"
                })
            }
                
                if(authenticateToken(request.headers['authorization'])){
                    try{
                        const myEvents = await knex('events')
                        .where('user_id', id)
                        .select('*')

                        return response.json(myEvents);
                    }catch(error){
                        next(error);
                    }
            }else{
                return response.sendStatus(401);
            }
        }
    },

    async create(request, response){
        const eventData = request.body;

    },

    async update(request, response){
        console.log('oi');
    },

    async delete(request, response){
        console.log('oi');
    }
}