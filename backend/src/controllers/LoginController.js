const validatePassword = require('../utils/validatePassword');
const bcrypt = require('bcrypt');
const verifyUserExistence = require('../../src/utils/verifyUserExistence');

module.exports = {
    async login(request, response,next){
        try{
            const userData =  request.body;

            if(validatePassword(userData.password)){
                const savedUser = await verifyUserExistence(userData.username);
                if(savedUser){
                    bcrypt
                        .compare(userData.password ,savedUser.password)
                        .then((result) => {
                            if(result){
                                response.json({
                                    result,
                                    message: 'Logando ...'
                                }); 
                            }else{
                                next(new Error('invalid login'));
                            }
                        });
                    }
                }

        }catch(error){
            next(error);
        }
    }
}