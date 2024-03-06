import React from 'react'

function Addblog() {
  return (
    <div
    className='h-screen bg-gradient-to-r from-green-950 to to-green-700 text-white flex justify-center items-center'
    >
   <div className='flex flex-col'>
   <form action="http://localhost:5173/add-blog" method='POST' className='flex flex-col'>
    <label htmlFor="">Author: </label>
    <input type="text" name='author' className='text-black'/>
    <label htmlFor="">Snippet: </label>
     <input type="text" name='snippet' className='text-black' />
    <label htmlFor="">Content: </label>
     <input type="text" name='content' className='text-black'/>
    <button type='submit'>submit</button>
   </form>
   </div>



    </div>
  )
}

export default Addblog