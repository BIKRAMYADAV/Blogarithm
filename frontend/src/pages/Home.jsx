import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Home() {  
  const [blogs, setBlog] = useState([])  
  useEffect(() => {
    axios.get('http://localhost:3000/showBlog')
    .then(blog => {
      console.log(blog.data);
      setBlog(blog.data)}).catch(err => console.log(err))
  }, [])

  return (
    <div className='h-max bg-gradient-to-r from-green-950 to to-green-700 text-white'>
   
     {blogs.map(blog => (
          <div key={blog._id} className='flex flex-col justify-center border-black'>
          <div className='flex flex-col m-2 border-2 w-72 '>
            <div className='flex items-center justify-center'>
            <h2 className='text-lg'>{blog.author}</h2>
            </div>
            <div>
            <p className='font-serif opacity-40'>{blog.snippet}</p>
            </div>
          <div>
            <p className='font-mono'>{blog.content}</p>
            </div>
            </div>
          </div>
        ))}
        </div>
  )
}

export default Home