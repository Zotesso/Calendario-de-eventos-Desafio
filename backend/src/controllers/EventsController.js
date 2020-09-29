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
            .join('users', 'users.id', '=', 'events.user_id')
            .select(['events.*','users.name']);

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

    async create(request, response, next){
        const eventData = request.body;
        try{
            if(authenticateToken(request.headers['authorization'])){
                const id = await knex('events').insert({
                    title: eventData.title,
                    description: eventData.description,
                    visibility: eventData.visibility,
                    eventStartTime: eventData.eventStartTime,
                    eventEndTime: eventData.eventEndTime,
                    user_id: eventData.userId
                });

                return response.sendStatus(200);
            }else{
                return response.sendStatus(401);
            }
        }catch(error){
            next(error);
        }
    },

    async update(request, response){
        console.log('oi');
    },

    async delete(request, response){
        console.log('oi');
    }
}