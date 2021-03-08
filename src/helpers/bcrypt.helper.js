const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = (plainPassword) => {
    return new Promise((resolve) => {
        resolve(bcrypt.hashSync(plainPassword, saltRounds));
    });
};

const comparePassword = (plainPassword, hashPasswordDB) =>{
    
    return new Promise((resolve, reject) =>{

bcrypt.compare(plainPassword, hashPasswordDB, function(err, result){

    if(err){
        reject(err)
    }
    resolve(result);
})

    })

}


module.exports = {
    hashPassword,
    comparePassword
};