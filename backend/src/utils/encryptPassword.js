const bcrypt = require('bcrypt');

module.exports = function encryptPassword(plainPassword, saltRounds){
    return new Promise((resolve, reject) =>
    bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
      err ? reject(err) : resolve(hash)
    })
  )
}