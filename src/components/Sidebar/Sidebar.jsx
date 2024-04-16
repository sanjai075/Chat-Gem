import React, { useContext, useState } from 'react'
import {assets} from "../../assets/assets"
import { Context } from '../../context/context'
import { TfiMenu } from "react-icons/tfi";
import { FaRegMessage } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import {motion,easeOut} from "framer-motion"


const Sidebar = () => {

  const [extended,SetExtended] = useState(false)
  const{onSent,prevPrompt,SetPrevPrompt,SetRecentPrompt,newChat} = useContext(Context)

const load = async (prompt)=>{
   SetRecentPrompt(prompt)
  await onSent(prompt)
}
  

  return (
    <div className={extended?'hidden w-48 transition-all duration-1000 ease-out   md:block font-Outfit text-slate-300  bg-slate-950':'w-16 transition-all duration-1000 ease-out md:block  font-Outfit text-white  bg-slate-950'}>
    <motion.div
    initial={{opacity:0, x:-80}}
    animate={{ opacity: 1, x:0 }}
    transition={{duration:1 , delay:0.3 , ease:easeOut}}
    
    className={extended?'hidden h-full     md:flex  md:flex-col justify-between font-Outfit text-white  bg-slate-900':'  md:flex h-full  md:flex-col justify-between font-Outfit text-white bg-slate-900'}>
      
      <div className='  ml-4  '>

          <div className='  mt-5  '>
            {/* <img onClick={()=>SetExtended(!extended)} src={assets.menu_icon}/> */}
            <TfiMenu onClick={()=>SetExtended(!extended)} className='text-white w-7 h-6 ' />
          </div>

         <div onClick={()=>newChat()} className='flex mt-9 bg-slate-800 items-center justify-center w-fit p-1   mr-5   rounded-3xl gap-2  '>
            {/* <img className='w-4 h-5' src={assets.plus_icon}/> */}
            <FaPlus className='text-white w-5 h-4' />
           {extended && <p className=' w-20 '>New chat</p>}
           
         </div>

        {extended
        ? <div>
             <div className=' mt-6'>
               <p>Recent</p>
           </div >

         <div className='mt-4'>
           {prevPrompt.map((item)=>{
           return(
          
            <div className='w-36 flex items-center  text-[13px] gap-2 cursor-pointer  p-2 font-Outfit mr-5 hover:bg-slate-300 rounded-xl  '>
             {/* <img className='w-6 h-6 ' src={assets.message_icon} alt="" /> */}
             <FaRegMessage className='text-white w-4 h-4' />
             <p onClick={()=>load(item)} className=''>{item.slice(0,16)}...</p>
            </div>
          
          
         )
       })}
      </div>
      
      
      </div>
      :null
      }
        
        

        </div> 

           <div className='text-[14px] flex flex-col ml-4 w-fit mb-4 gap-4 '>

             <div className=' flex gap-2  items-center rounded-xl p-1 hover:bg-slate-800'>
              {/* <img className='w-4 h-4' src={assets.question_icon} alt="" /> */}
              <IoMdHelpCircleOutline className='text-white w-5 h-5' />
              {extended && <p>Help</p>}
           </div> 

         <div className='flex gap-2 items-center rounded-xl p-1 hover:bg-slate-800'>
            {/* <img className='w-4 h-4' src={assets.history_icon} alt="" /> */}
            <FaHistory className='text-white w-4 h-4' />
            {extended && <p>Acitvity</p>}
         </div>
         
         <div className=' flex gap-2 items-center rounded-xl p-1 hover:bg-slate-800'>
            {/* <img className='w-4 h-4' src={assets.setting_icon} alt="" /> */}
            <IoMdSettings className='text-white w-4 h-4' />
            {extended && <p>Settings</p>}
         </div>

         </div>
        
        
    </motion.div>
    </div>
  )
}

export default Sidebar

