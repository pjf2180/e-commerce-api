const express = require('express');
const app = express();
const mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');

const dbUser = process.env.DB_USER;
const dbName = process.env.DB_NAME;
const password = process.env.ATLAS_MONGO_DB;
console.log(dbName);
console.log(password);
const mongoUri = `mongodb+srv://${dbUser}:${password}@cluster0-to844.azure.mongodb.net/${dbName}?retryWrites=true&w=majority`
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err === null){
        console.log('Connected to Mongo!')
    }
    else{
        console.log('Error connection to mongo: ',err);
    }
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Acces-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.send({});
    }
    next();
})


const productRouter = require('./api/routes/products');
app.use('/products', productRouter);

const ordersRouter = require('./api/routes/orders');
app.use('/orders', ordersRouter);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;
