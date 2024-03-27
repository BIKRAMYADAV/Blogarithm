const express = require('express')
const connectDB = require('./connections/db')
const Blog = require('./models/Blog')
const PORT = 3000
const cors = require('cors')
const app = express()

//middleware
app.use(express.json())
app.use(cors())

connectDB()   
 

app.listen(PORT, (req, res) => {
    console.log(`The server is listening on port ${PORT}`)
})



app.get('/showBlog',async (req, res) => {
   await Blog.find().then(users => res.json(users)).catch(err => console.log(err))
})

app.post('/addBlog', async (req, res) => {
   try{
    let blog = new Blog(req.body);
    let result = await blog.save();
    res.send(result);
   } catch (error) {
    res.status(500).send(error.message);
   }
})