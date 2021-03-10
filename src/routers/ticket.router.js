const express = require('express');
const router = express.Router();

router.all('/', (req, res, next) =>{
    console.log(data);
    res.json({
        msg: "return from ticket router"
    })
})


module.exports = router;