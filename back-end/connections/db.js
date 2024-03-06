const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const URI = process.env.URI

const connectDB = async () => await mongoose.connect(URI).then(result => console.log('connected to the database'))
                  .catch(err => console.log(err))

module.exports = connectDB