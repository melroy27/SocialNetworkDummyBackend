require('./models/db');

const express = require('express');
const dotenv = require('dotenv')
dotenv.config()

const rtsIndex = require('./routes/index');

const cors = require('cors');

var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api', rtsIndex)

//handling error
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valError = [];
        Object.keys(err.errors).forEach(key => valError.push(err.errors[key].message));
        res.status(422).send(valError)
    }
});
//start server
app.listen(process.env.PORT, () => console.log(`Server Started at port: ${process.env.PORT}`));