const validatePassword = require('../utils/validatePassword');
const bcrypt = require('bcrypt');
const verifyUserExistence = require('../../src/utils/verifyUserExistence');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
                                const acessToken = jwt.sign({name: userData.username}, process.env.ACESS_TOKEN_SECRET);

                                response.json({
                                    acessToken: acessToken
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