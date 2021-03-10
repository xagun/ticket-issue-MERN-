
const {verifyAccessJWT} = require ('../helpers/jwt.helper')
const {getJWT, deleteJWT} = require ('../helpers/redis.helper')
const userAuthorization = async (req, res, next) => {

    const {authorization} = req.headers
    
    const decoded = await verifyAccessJWT(authorization)

    if(decoded.email){
        console.log(decoded);
        const userId = await getJWT(authorization)
        console.log(userId);

        if(!userId){
           return res.json({
                status: 403,
                message: "Forbidden request"
            })
        }


        req.userId = userId

           
    return next();
    }

    deleteJWT(authorization);


    return res.json({
        status: 403,
        message: "Forbidden request"
    })


}

module.exports = {
    userAuthorization
}