const knex = require("../database/connection");
const authenticateToken = require("../utils/authenticateToken");
const verifyIfEventExists = require("../utils/verifyIfEventExists");

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
                const eventExist = await verifyIfEventExists(eventData.title, eventData.userId);
                if(eventExist){
                    return response.json({message: 'Evento já existente, edite-o diretamente'});    
                }else{
                    await knex('events').insert({
                        title: eventData.title,
                        description: eventData.description,
                        visibility: eventData.visibility,
                        eventStartTime: eventData.eventStartTime,
                        eventEndTime: eventData.eventEndTime,
                        user_id: eventData.userId
                    });
    
                    return response.json({message: 'Evento cadastrado com sucesso!'});    
                }
            }else{
                return response.sendStatus(401);
            }
        }catch(error){
            next(error);
        }
    },

    async update(request, response,next){
        const { id } = request.params;
        const user_id = request.headers.user;
        const eventData = request.body;

        try{
            if(authenticateToken(request.headers['authorization'])){
            const event = await knex('events')
                .where('id', id)
                .select('user_id')
                .first();

                if(event.user_id != user_id){
                    console.log(event.user_id, '/', user_id);
                    return response.status(403).json({error: 'Operation not permitted'});
                }

                await knex('events')
                .where('id', id)
                .update({
                  title: eventData.title,
                  description: eventData.description,
                  eventStartTime: eventData.eventStartTime,
                  eventEndTime: eventData.eventEndTime,
                })

                return response.status(204).send();
            }
        }catch(error){
            next(error);
        }
    },

    async delete(request, response, next){
        const { id } = request.params;
        const user_id = request.headers.user;

        try{
            if(authenticateToken(request.headers['authorization'])){
        const event = await knex('events')
            .where('id', id)
            .select('user_id')
            .first();

            if(event.user_id != user_id){
                return response.status(401).json({error: 'Operation not permitted'});
            }

            await knex('events').where('id',id).delete();

            return response.status(204).send();
            }
        }catch(error){
            next(error);
        }
    }
}