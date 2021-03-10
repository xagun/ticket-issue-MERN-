const express = require('express');
const router = express.Router();


const { hashPassword, comparePassword } = require('../helpers/bcrypt.helper');
const { createAccessJWT, createRefreshJWT } = require('../helpers/jwt.helper');
const { insertUser, getUserByEmail, getUserById } = require('../model/user/User.model');

const {userAuthorization} = require('../middlewares/authorization.middleware');




router.all('/', (req, res, next) => {

    next();
})


// Get user profile route
router.get('/', userAuthorization, async(req, res) => {
 const _id = req.userId

 const userProfile = await getUserById(_id)

    res.json({ user: userProfile });
})


// Create new User routes
router.post('/', async (req, res) => {

    const { name, email, password, phone, company, address } = req.body;


    try {

        // PAssword hashing
        const hashedPassword = await hashPassword(password);
        const newUserObj = {
            name, email, phone, company, address,
            password: hashedPassword
        }


        const result = await insertUser(newUserObj)
        console.log('user data', result);

        res.json({
            message: "New user created",
            result
        })

    } catch (error) {
        console.log(error);
        res.json({
            status: '404',
            message: error.message
        })


    }




})


// User Login router
router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    console.log(req.body);




    if (!email || !password) {
        return res.json({
            message: "error invalid data submission"
        })
    }


    // get user emailfrom db
    const user = await getUserByEmail(email)

    // hash the password and compare to db hashed password
    const hashedPasswordDB = user && user._id
        ? user.password
        : null

    if (!hashedPasswordDB) {
        return res.json({
            message: "Invalid email or password"
        })
    }





    const result = await comparePassword(password, hashedPasswordDB)

    console.log(result);

    if (result === true) {
        const accessJWT = await createAccessJWT(user.email, `${user._id}`);

        const refreshJWT = await createRefreshJWT(user.email, `${user._id}`);
        res.json({
            message: "Login successful",
            accessJWT,
            refreshJWT

        })
    } else {
        res.json({
            message: "Invalid email or password"
        })

    }


})



module.exports = router;