
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => { console.log('connected success') },
    err => { console.log('faced some issue', err) }
)

mongoose.connection.on('connected', (err) => {
    if (!err) {
        console.log('Mongo Db successful');
    }
    else {
        console.log('Error in connection of DB:' + JSON.stringify(err, undefined, 2));
    }
})
require('./post')
require('./user')
require('./userData')