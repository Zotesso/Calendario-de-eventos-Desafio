const validatePassword = require('../utils/validatePassword');
const bcrypt = require('bcrypt');
const verifyUserExistence = require('../../src/utils/verifyUserExistence');
const jwt = require('jsonwebtoken');
const getUserIdByName = require('../utils/getUserIdByName');
require('dotenv').config();

module.exports = {
    async login(request, response,next){
        try{
            const userData =  request.body;

            if(validatePassword(userData.password)){
                const savedUser = await verifyUserExistence(userData.username);
                const userId = await getUserIdByName(userData.username);
                if(savedUser){
                    bcrypt
                        .compare(userData.password ,savedUser)
                        .then((result) => {

                            const user = { name: userData.username}
                            if(result){
                                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

                                response.json({
                                    userId: userId,
                                    accessToken: accessToken
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