module.exports = function validatePassword(password){
    const validPassword = typeof password == 'string' && 
                          password.trim() != '' &&
                          password.trim().length >= 6;

    return validPassword;
}

