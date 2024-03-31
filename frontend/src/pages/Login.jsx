import React from 'react'
import { useState } from 'react'
function Login() {
  //state variables to store form data
  const [email, getEmail] = useState("")
  const [password, getPassword] = useState("")
 
  //function to handle form submission
  const CollectData = async (e) => {
   e.preventDefault();
   try {
     const result = await fetch('http://localhost:3000/login', {
       method : 'POST',
       headers : {
         'content-type' : 'application/json'
       },
       body : JSON.stringify({ email, password})
 
     })
     const response = await result.json()
     localStorage.setItem('user', JSON.stringify(response));

     if (!response.ok) {
      throw new Error('Invalid credentials');
     }

     // Extract JWT token from response
     const { token } = await response.json

     localStorage.setItem('jwtToken', token);

     window.location.href = '/home';

      
   }
   catch(err){
     console.log(err);
   }
  }
 

  return (
    <div className='h-screen bg-gradient-to-r from-green-950 to to-green-700 text-white flex justify-center items-center'>
    <div className='flex flex-col '>
      <h1>LOGIN</h1>
      <form onSubmit={CollectData} className='flex flex-col space-y-4'>
        <label htmlFor='snippet'>Email:</label>
        <input type='text' id='snippet' value={email} onChange={(e) => getEmail(e.target.value)} className='text-black' />
        <label htmlFor='snippet'>Password:</label>
        <input type='text' id='snippet' value={password} onChange={(e) => getPassword(e.target.value)} className='text-black' />
        <button type='submit' className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-950 dark:hover:bg-green-700 dark:focus:ring-green-800'>Submit</button>
      </form>
    </div>
  </div>
  )
}

export default Login