var jwt = require('jsonwebtoken');

const { setJWT, getJWT } = require('./redis.helper');
const {storeUserRefreshJWT} = require('../model/user/User.model')
 

const createAccessJWT = async (email, _id) => {


    try {
        const accessJWT = jwt.sign(
            { email },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: '15m' });

        await setJWT(accessJWT, _id);

        return Promise.resolve(accessJWT)

    } catch (error) {

        return Promise.reject(error);

    }



}

const createRefreshJWT = async (email, _id) => {

    try {
        const refreshJWT = jwt.sign(
            { email },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '30d' });
    
    
            storeUserRefreshJWT(_id, refreshJWT)
    
        return Promise.resolve(refreshJWT)
    } catch (error) {
        Promise.reject(error)
    }

 

}

module.exports = {
    createAccessJWT,
    createRefreshJWT
}