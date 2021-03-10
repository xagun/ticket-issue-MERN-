const express = require('express');
const router = express.Router();


const { verifyRefreshJWT, createAccessJWT } = require('../helpers/jwt.helper')
const { getUserByEmail } = require('../model/user/User.model')


// return refresh jwt
router.get('/', async (req, res, next) => {

    const { authorization } = req.headers;

    // making sure if the token is valid

    const decoded = await verifyRefreshJWT(authorization)

    if (decoded.email) {
        const userProfile = await getUserByEmail(decoded.email)
        if (userProfile._id) {

            let tokenExp = userProfile.refreshJWT.addedAt;
            const dBrefreshToken = userProfile.refreshJWT.token;


            tokenExp = tokenExp.setDate(tokenExp.getDate() + +process.env.JWT_REFRESH_SECRET_EXP_DAY);

            const today = new Date();



            if (dBrefreshToken !== authorization && tokenExp < today) {
                // expired
                res.json({
                    status: 403,
                    message: 'token expired'
                });
            }

            const accessJWT = await createAccessJWT(decoded.email, userProfile. _id.toString())
            return res.json({
                status:200,
                message: accessJWT
            })


            // delete the old token from redis db


            
        }

    }

    res.json({
        status: 403,
        message: "Forbidden request"
    })
})



// token validation 


module.exports = router;