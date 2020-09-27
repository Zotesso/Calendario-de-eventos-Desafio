const validatePassword = require('../utils/validatePassword');

module.exports = {
    async login(request, response,next){
        try{
        userData =  request.body;
        validatePassword(userData.password);
        }catch(error){
            next(error);
        }
    }
}