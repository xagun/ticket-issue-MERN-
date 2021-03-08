const express = require('express');
const router = express.Router();

router.all('/', (req, res, next) =>{
    concole.log(data);
    res.json({
        msg: "return from ticket router"
    })
})


module.exports = router;