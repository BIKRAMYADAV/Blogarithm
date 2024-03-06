import React from 'react'
import { Link } from "react-router-dom";






function Navbar() {
  return (
    <div className='flex flex-row w-full bg-black text-white h-16 content-center'>
      <div className='flex  basis-1/2 py-4 px-4'>
        <h1 className='text-green-700'>BLOGARITHM</h1>
      </div>
      <div className='flex py-4'>
        <ul className='flex space-x-4 content-center '>
        <li>
              <Link to="/" className='hover:text-green-700'>Home</Link>
</li>
            <li>
              <Link to="/add-blog" className='hover:text-green-700'>Add</Link>
</li>
<li>
              <Link to="/profile" className='hover:text-green-700'>Profile</Link>
</li>
         
        </ul>
      </div>

    </div>
  )
}

export default Navbar