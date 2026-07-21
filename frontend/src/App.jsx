import { useContext, useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import ChatBox from './components/ChatBox'
import Credits from './pages/Credits'
import Community from './pages/Community'
import {Route, Routes, useLocation} from 'react-router-dom'
import Navbar from './components/Navbar'
import { assets } from './context/assets/assets'
import './context/assets/prism.css'
import Loading from './pages/Loading'
import Login from './pages/Login'
import { AppContext } from './context/AppContext'


function App() {
  
const {user} = useContext(AppContext)

const [isMenuOpen, setIsMenuOpen] = useState(false)
const {pathname} = useLocation()

if(pathname === '/loading') return <Loading/>

  return (
    <>
    {!isMenuOpen && <img src={assets.menu_icon} className='absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert' onClick={()=>setIsMenuOpen(true)}></img>}

    {user ? (
        <div className='dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white'>
         <div className='flex h-screen w-screen'>
           <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
            <Routes>
              <Route path='/' element={<ChatBox/>} />
              <Route path='/credits' element={<Credits/>} />
              <Route path='/community' element={<Community/>} />
           </Routes>
        </div>
      </div>
    )
     :
    (
   <div className='dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white'>   
      <Login/>
   </div>
     )
   }
    </>
  )
}

export default App
