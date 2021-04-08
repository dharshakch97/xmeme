const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express()
const port=process.env.PORT
const mongo_uri=process.env.MONGO_URI

app.use(cors())
app.use(bodyParser.json()) //crQTraO9DED0IVTP

mongoose.connect(mongo_uri, { useNewUrlParser:true, useCreateIndex: true, 
    useUnifiedTopology: true, useFindAndModify: true })

const conn = mongoose.connection;
conn.once('open', () => {
    console.log('MongoDB database connected')
})

app.use('/', require('./routes/meme'))

//listen for request
app.listen(port, function () {
    console.log(`Now listening for Requests on Port : ${port}`);
})
