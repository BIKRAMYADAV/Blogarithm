const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String
    }
    ,
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    token : {
        type : String,
        // default : null
    }
})

module.exports = mongoose.model('user', UserSchema)