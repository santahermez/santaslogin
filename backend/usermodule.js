const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,

    },
    email: {
        type: String,
        
    },
    password: {
        type: String,
        
    }
})

module.exports = mongoose.model('users', userSchema)