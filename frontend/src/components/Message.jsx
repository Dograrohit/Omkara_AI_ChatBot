import React, { useContext, useEffect } from 'react'
import { assets } from '../context/assets/assets'
import moment from 'moment'
import Markdown from 'react-markdown'
import prism from 'prismjs'
import { AppContext } from '../context/AppContext'

const Message = ({message}) => {

  const{theme} = useContext(AppContext)

  useEffect(()=>{
     prism.highlightAll()
  },[message.content])
  return (
    <>
      {message.role === "user" ? (
         <div className='flex items-start justify-end my-4 gap-2'>
          <div className='flex flex-col gap-2 p-2 px-4 bg-slate-50 dark:bg-[#00b4d8] border border-[#80609f]/30 rounded-md max-w-2xl'>
             <p className='text-sm dark:text-white'>{message.content}</p>
             <span className='text-xs text-gray-400 dark:text-white'>{new Date(message.timestamp).toLocaleTimeString('en-IN', {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
             })}</span>
          </div>
          <img src={assets.user_icon} className='w-8 rounded-full'></img>
         </div>
      )
      :
      (
        <div className='flex items-start my-4 gap-2'>
          <img src={theme === "light" ? assets.logo:assets.logo_3} className='w-8 rounded-full'></img>
           <div className='inline-flex flex-col gap-2 px-4 max-w-2xl bg-[#00b4d8]/20 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md my-4'>
            {message.isImage ? (
              <img src={message.content} className='w-full max-w-md mt-2 rounded-md'></img>
            ):(
              <div className='text-sm dark:text-primary reset-tw'>
                 <Markdown>{message.content}</Markdown>
              </div>
            )}
            <span>{new Date(message.timestamp).toLocaleTimeString('en-IN', {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
             })}</span>
        </div>
        </div>
       
      )}
    </>
  )
}

export default Message
