import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../context/assets/assets'
import Message from './Message'

const ChatBox = () => {
  const {selectedChat, theme} = useContext(AppContext)
  
  const [messages,setMessages] = useState([])
  const [loading,setLoading] = useState(false)

  const [prompt, setPrompt] = useState('')
  const [mode,setMode] = useState('text')
  const [isPublished, setIsPublished] = useState(false)

  const onsubmit = async (e) =>{
    e.preventDefault()
  }

  useEffect(()=>{
      if(selectedChat){
        setMessages(selectedChat.messages)
      }
  },[selectedChat])
  return (
    <>
      <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40'>
           
           {/* Chat Messages */}
           <div className='flex-1 mb-5 overflow-y-scroll'>
              {messages.length === 0 && (
                <div className='h-full flex flex-col items-center justify-center gap-2 text-primary'>
                  <img src={theme === 'dark' ? assets.logo_2 : assets.logo_light} className='w-full scale-120 max-w-56 sm:max-w-68'></img>
                  <p className='mt-5 text-4xl sm:text-5xl text-center text-gray-400 dark:text-white'>Ask Me Anything...</p>
                </div>
              )}

              {messages.map((message,index)=>(<Message key={index} message={message}/>))}

              {/* three dots loading */}
              {loading && <div className='loader flex items-center gap-1.5 mt-10'>
                      <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
                      <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
                      <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
                </div>
              }
           </div>

           {/* Prompt Input Box */}
           <form onsubmit={onsubmit} className='border flex flex-col justify-around rounded-[20px]'>

            <input onChange={(e)=>setPrompt(e.target.value)} value={prompt} type='text' className='flex-1 w-full text-sm outline-none m-4' placeholder='Message OmKara AI...' required></input>

            <div className='flex justify-between'>
              
              <select onChange={(e)=>setMode(e.target.value)} value={Node} className='text-sm pl-3 pr-2 outline-none'>
                <option className='dark:bg-purple-900' value="text">Text</option>
                <option className='dark:bg-purple-900' value="image">Image</option>
              </select>

               <button className='m-2 w-10 h-10 rounded-[50%] overflow-hidden bg-[#00b4d8]' disabled={loading}>
                <img src={loading ? assets.search_icon : assets.send_icon} className='w-9 cursor-pointer'></img>
              </button>

            </div>

           </form>
      </div>
    </>
  )
}

export default ChatBox
