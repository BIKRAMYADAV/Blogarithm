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

app.get('/add-blog', (req, res) => {
    console.log('data received')
})
//routes
app.post('http://localhost:5173/add-blog', async (req, res) => {
   const {author, snippet, content} = req.body
   data = new Blog({
    author,
    snippet,
    content
   })
  await data.save()
})