import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../context/assets/assets'
import moment from 'moment'

const Sidebar = ({isMenuOpen,setIsMenuOpen}) => {

  const {chats, setSelectedChat, theme,setTheme ,user,navigate} = useContext(AppContext)
  const [search,setSearch] = useState('')

  return (
    <>
    {/* bg-gradient-to-b from-[#242124]/30 to-[#000000]/30 */}
      <div className={`flex flex-col h-screen min-w-80 p-3 dark::bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white border-r border-[#80609F]/30 backdrop-blur-3xl transition-all duration-500 max-md:absolute left-0 z-1 ${!isMenuOpen && "max-md:-translate-x-full"}`} >
       {/* logo */}
       <img src={theme === 'dark' ? assets.logo_2 : assets.logo_light} className='w-full h-[10%] object-cover max-w-72'></img>
       {/* new chat button */}
       <button onClick={()=>{navigate("/"); setSelectedChat(null)}} className='flex justify-center items-center w-full py-1 mt-5 text-white bg-gradient-to-r from-[#00b4d8] to-[#90e0ef] text-md rounded-md cursor-pointer'>
          <span className='mr-2 text-xl'>+</span>
          New Chat 
       </button>

       {/* Search Conversations */}

        <div className='flex items-center gap-2 p-3 mt-2 border border-gray-400 dark:border-white/20 rounded-md'>
          <img src={assets.search_icon} className='w-4 not-dark:invert'></img>
          <input onChange={(e)=>setSearch(e.target.value)} value={search} placeholder='Search Conversations' className='text-xs placeholder:text-gray-400 outline-none'></input>
       </div> 


      {/* community Images */}
      <div onClick={()=>{navigate('/community'); setIsMenuOpen(false)}} className='flex items-center gap-2 p-2 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all'>
         <img src={assets.gallery_icon} className='w-4.5 not-dark:invert'></img>
         <div className='flex flex-col text-sm'>
            <p>Community Images</p>
         </div>
      </div>

      {/* Plans Purchases Option */}
      <div onClick={()=>{navigate('/credits'); setIsMenuOpen(false)}} className='flex items-center gap-2 p-2 mt-2 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all'>
         <img src={assets.diamond_icon} className='w-4.5 dark:invert'></img>
         <div className='flex flex-col text-sm'>
            <p>Upgrade</p>
         </div>
      </div>
      
  
    {/* Dark Mode Toggle */}
      <div className='flex items-center justify-between gap-2 p-2 mt-2 border border-gray-300 dark:border-white/15 rounded-md'>
         <div className='flex items-center gap-2 text-sm'>
          <img src={assets.theme_icon} className='w-4 not-dark:invert'></img>
            <p>Dark mode</p>
         </div>
         <label className='relative inline-flex cursor-pointer'>
             <input onChange={()=>setTheme(theme === 'dark' ? 'light' : 'dark')} type='checkbox' className='sr-only peer' checked={theme === 'dark'}></input>
             <div className='w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-[#00b4d8] transition-all'> </div>
              <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4'></span>
         </label>
      </div>

      {/* Recent Charts */}

       {chats.length > 0 && <p className='mt-4 text-sm'>Recent chats</p>}
       <div className='flex-1 overflow-y-scroll mt-3 text-sm space-y-3'>
         {
          chats.filter((chat)=> chat.messages[0] ? chat.messages[0]?.content.toLowerCase().includes(search.toLowerCase()) : chat.chatname.toLowerCase().includes(search.toLowerCase())).map((chat)=>(
            <>
             <div onClick={()=>{navigate('/'); setIsMenuOpen(false); setSelectedChat(chat)}} key={chat._id} className='p-2 px-2 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between group'>
               <div>
                 <p className='truncate w-full'>
                   {chat.messages.length > 0 ? chat.messages[0].content.slice(0,30) : chat.chatname}
                 </p>
                 {/* <p className='text-xs text-gray-500 dark:text-[#B1A6C0]'>{moment(chat.updatedAt).fromNow()}</p> */}
               </div>
               <img src={assets.bin_icon} className='hidden group-hover:block w-3 cursor-pointer not-dark:invert'></img>
             </div>
            </>
          ))
         }
       </div>

      {/* User Profile */}
       <div className='flex items-center gap-3 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer group'>
         <img src={assets.user_icon} className='w-7 border border-[#00b4d8] border-2 rounded-[50%] not-dark:invert'></img>
            <p className='flex-1 text-sm dark:text-primary truncate'>{user ? user.name : "login your Account"}</p>
            {user && <img src={assets.logout_icon} className='h-5 cursor-pointer hidden not-dark:invert group-hover:block'></img>}
      </div>

      <img onClick={()=>setIsMenuOpen(false)} src={assets.close_icon} className='absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden not-dark:invert'></img>

      </div>
    </>
  )
}

export default Sidebar