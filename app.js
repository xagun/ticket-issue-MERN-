
require('dotenv').config();
const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const port = process.env.PORT || 3000;

// API security
app.use(helmet());


// handle cors error
app.use(cors());


// MongoDB 
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

if(process.env.NODE_ENV !== 'production'){

    const mongoDB = mongoose.connection

mongoDB.on('open', ()=>{
    console.log("Database connection is established")
});

mongoDB.on('error', (error) =>{
    console.log(error);
})


// Logger
app.use(morgan('tiny'));


}



// SEt body parser

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// load routers
const userRouter = require('./src/routers/user.router');
const ticketRouter = require('./src/routers/ticket.router');
// use Routers
app.use('/v1/user', userRouter);
app.use('/v1/ticket', ticketRouter);


// Error handler
const handleError = require('./src/utils/errorHandler');

app.use((req, res, next)=>{
    const error = new Error('Resource not found');
    error.status = 404;

    next(error);

})

app.use((error, req, res, next) =>{
handleError(error, res);
})



// PORT listening

app.listen(port, () => {
    console.log(`API is started on http://localhost:${port}`)
});



