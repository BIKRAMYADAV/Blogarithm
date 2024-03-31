const express = require('express')
const connectDB = require('./connections/db')
const Blog = require('./models/Blog')
const PORT = 3000
const cors = require('cors')
const app = express()
const User = require('./models/User')
const bcrypt =  require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser')
//middleware
app.use(express.json())
app.use(cors())
app.use(cookieparser())

connectDB()   

const secretKey = 'shhh'
 

app.listen(PORT, (req, res) => {
    console.log(`The server is listening on port ${PORT}`)
})



app.get('/showBlog',async (req, res) => {
   await Blog.find().then(users => res.json(users)).catch(err => console.log(err))
})

app.post('/addBlog',verifyToken, async (req, res) => {
   try{
    let blog = new Blog(req.body);
    let result = await blog.save();
    res.send(result);
   } catch (error) {
    res.status(500).send(error.message);
   }
})

app.post('/register', async (req, res) => {
   try{
      const {firstname, lastname, email, password} = req.body
      if(!(firstname && lastname && email && password)) {
            res.status(400).send('All field are compulsory')
      }
      const existinguser = await User.findOne({email})
      if(existinguser){
         res.status(400).send('user already exists')
      }
      //encrypting
      const myencpassword = await bcrypt.hash(password,10)

      const user = await User.create({
         firstname,
         lastname,
         email,
         password: myencpassword
      })

      //generating a token for user and sending it
     const token =  jwt.sign(
         {id: user._id, email: email},
         secretKey,
         {
            expiresIn : "2h"
         }
      );
      console.log(token);
      user.token = token
      console.log('user token : ', user.token)
      user.password = undefined

      res.status(201).json(user)
      // localStorage.setItem('jwtToken', res.token);

   }
   catch(error){
         console.log(error);
   }
})


function verifyToken(req, res, next) {
   // Get auth header value
   const authHeader = req.headers['authorization'];

   // Check if auth header is present
   if (typeof authHeader !== 'undefined') {
       // Extract token from auth header (Bearer token)
       const token = authHeader.split(' ')[1];

       // Verify token
       jwt.verify(token, secretKey, (err, decoded) => {
           if (err) {
               return res.status(403).json({ error: 'Invalid token' });
           }

           // Set decoded user ID in request object
           req._id = decoded._id;
           next(); // Call next middleware
       });
   } else {
       // No auth header
       res.status(401).json({ error: 'Unauthorized' });
   }
}


app.post('/login', async (req, res) => {
   try{
      //get all data from frontend
      const {email, password} = req.body
      //validation
      if (!(email && password)) {
         res.status(400).send('send all fields')
      }

      //find user in db
      const user = await User.findOne({email})
      //match the password
      
      if(user && (await bcrypt.compare(password, user.password))){
       const token =   jwt.sign(
            {id : user._id},
            'shhh',
            {
               expiresIn : "2h"
            }
         );
         user.token = token
         user.password = undefined

         //cookie section
         const options = {
            expires : new Date(Date.now() + 3 *24 *60*60*1000),
            httpOnly : true
         }
         res.status(200).cookie("token", token, options).json({
            success : true,
            token,
            user
         })
      }

      //send a token
   }
   catch (error) {
      console.log(error);
   }
})
