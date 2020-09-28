const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function authenticateToken(authHeader){
    let authorized = true;
            const token = authHeader && authHeader.split(' ')[1];
            
            if(token == null) authorized = false;
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) authorized = false
            });

        return authorized;
    }