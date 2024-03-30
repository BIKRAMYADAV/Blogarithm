import Home from './pages/Home.jsx'
import AddBlog from './pages/Addblog.jsx'
import Profile from './pages/Profile.jsx'
import './index.css'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from './components/Navbar.jsx'
import Register from './pages/Register.jsx'


function App() {
 return (
  <>
     <Navbar/>
      <Routes> 
         <Route path='/' element = {<Register />} />
          <Route path='/home' element={<Home />} />
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="profile" element={<Profile />} />
        
      </Routes>
   
      </>
    
 )
}

export default App
