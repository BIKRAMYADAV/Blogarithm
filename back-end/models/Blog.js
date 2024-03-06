const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
    author : {
        type : String,
        required : true
    },
    snippet : {
        type : String
    }
    ,
    content : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('BlogModel', BlogSchema)