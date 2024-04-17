import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import {Context} from "../../context/context"
import Sidebar from '../Sidebar/Sidebar'
import { TfiMenu } from "react-icons/tfi";
import { FaRegMessage } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { SlBulb } from "react-icons/sl";
import { LiaCompass } from "react-icons/lia";
import { IoCodeSlashOutline } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { easeOut, motion } from "framer-motion"
import { GiHotMeal } from "react-icons/gi";

const Main = () => {

  const example1 = "Suggest beautiful places to see on an upcomming road trip"
  const example2 = "Give me a basic guide on how to cultivate a growth mindset"
 const example3 = "Brainstrom team bonding activities for our work retreat"
 const example4 = "Write a meal plan for one week using a mixture of proteins and vegetables that can be prepared in under 30 minutes"
 
  const {input,
    SetInput,
    recentPrompt,
    SetRecentPrompt,
    prevPrompt,
    SetPrevPrompts,
    showResult,
    SetShowresult,
    loading,
    SetLoading,
    resultData,
    SetResultData,
    onSent,
  newChat} = useContext(Context)

  const [side,SetSide] =useState(false)

  const load = async (prompt)=>{
    SetInput("")
    SetPrevPrompts(prev=>[...prev,prompt])
    SetRecentPrompt(prompt)
   await onSent(prompt)
 }

  return (
    <div className='w-full  flex flex-col  bg-gray-950 text-slate-300 font-Outfit'>
      
     {side ?
     <div className={side?'md:hidden  absolute flex flex-col h-full   w-52 bg-slate-900 transition-all  duration-300 ease-out z-10':'w-0  transition-all duration-500 ease-out'} >

        <div className='flex items-center p-[15px] gap-[12.5px] '>
         {/* <img onClick={()=>SetSide(!side)} className='w-6' src={assets.menu_icon} alt="" /> */}
         <TfiMenu  onClick={()=>SetSide(!side)}   className='w-5 h-6 ml-[5px] hover:cursor-pointer' />
         <p className='text-[19px]'>Gemini</p>
        </div>

        <div onClick={()=>{SetSide(!side);newChat()}} className='flex bg-slate-700 justify-center items-center w-fit p-4  gap-2 mt-9 ml-4 rounded-2xl h-7 hover:cursor-pointer '>
            {/* <img className='w-4 h-5' src={assets.plus_icon}/> */}
            <FaPlus className='text-white ' />
            <p className='  '>New chat</p>
           
        </div>
       
        <div className=' h-96'>
        <div className='w-12  mt-6 ml-3'>
          <p>Recent</p>
      </div >
      <div className='mt-4 ml-5 '>
      {prevPrompt.map((item)=>{
         return(
          
            <div onClick={()=>{SetSide(!side);load(item)}} className='w-36 flex hover:cursor-pointer  items-center  text-[13px] gap-2 cursor-pointer  p-2 font-Outfit mr-5 hover:bg-slate-800 rounded-xl ml-1 '>
             {/* <img className='w-6 h-6 ' src={assets.message_icon} alt="" /> */}
             <FaRegMessage className='text-white w-4 h-4 ' />
             <p  className=''>{item.slice(0,16)}...</p>
            </div>
          
          
         )
       })}
      </div>
      
      
      </div>
        

       <div className='ml-4  flex flex-col gap-2  ' >

          <div className=' flex gap-2 w-fit  items-center rounded-xl p-2 hover:bg-slate-800 hover:cursor-pointer'>
            {/* <img className='w-4 h-4' src={assets.question_icon} alt="" /> */}
            <IoMdHelpCircleOutline className='text-white w-5 h-5' />
            <p>Help</p>
         </div> 

          <div className=' flex gap-2 w-fit items-center  rounded-xl p-2 hover:bg-slate-800 hover:cursor-pointer'>
             {/* <img className='w-4 h-4' src={assets.history_icon} alt="" /> */}
             <FaHistory className='text-white w-4 h-4' />
             <p>Activity</p>
          </div> 

          <div className=' flex gap-2 w-fit  items-center rounded-xl p-2 hover:bg-slate-800 hover:cursor-pointer'>
            {/* <img className='w-4 h-4' src={assets.setting_icon} alt="" /> */}
            <IoMdSettings className='text-white w-5 h-5' />
            <p>Settings</p>
          </div> 

      </div>

</div>
:<div className='w-0 transition-all duration-500 delay-150 ease-out overflow-x-auto-auto'>
  </div>} 

       <motion.div
       
       initial={{opacity:0 , y:-40}}
       animate={{ opacity: 1, y:0 }}
       transition={{duration:1 , delay:0.3 , ease:easeOut}}

       className=' flex p-3  w-[100%] items-center  justify-between   '>
           {/* <img  onClick={()=>SetSide(!side)} className='w-6 ml-2 md:hidden rounded-md fill-current text-green-600 ' src={assets.menu_icon} alt="" /> */}
        
           <div className='flex items-center w-full gap-[12.5px] ml-[-8px]  '>
            <TfiMenu  onClick={()=>SetSide(!side)}  className=' w-5 h-6   ml-4 md:hidden rounded-md ' />
            <p className=' md:ml-4 text-[19px] md:text-2xl'>Gemini</p>
          </div>

           <img className='  rounded-full w-9  ' src={assets.user_icon} alt="" />
      </motion.div>

       {!showResult?
         <div className='flex   flex-col w-full h-[70%]   items-center justify-center '>
            <div className=' w-[100%]   md:w-[80%]   md:flex  md:flex-col  '>
         
            <motion.div 
              initial={{opacity:0, x:-30}}
              animate={{ opacity: 1, x:0 }}
              transition={{duration:1 , delay:0.3 , ease:easeOut}}
             className='   ml-5  overflow-visible  md:h-[150px]  md:mt-1 md:text-[50px] md:w-[70]  h-44 flex flex-col  text-5xl font-bold  '>
             <p className="bg-gradient-to-r from-blue-500 via-red-800 to-red-950 inline-block text-transparent bg-clip-text">Hello, Dev</p>
            <p className="bg-gradient-to-r from-blue-500 via-red-500 to-red-800 inline-block text-transparent bg-clip-text">How can I help you today?</p>
          </motion.div>

            <div
             className='flex md:overflow-hidden w-[95%] md:w-[100%]  md:mt-3 overflow-x-scroll overflow-hidden scrollbar-hide     ml-4       gap-2 '>
             {/* overflow-x-scroll overflow-hidden scrollbar-hide */}
             
    
              <motion.div
                initial={{opacity:0}}
                animate={{ opacity: 1 }}
                transition={{duration:1,delay:0.4,ease:easeOut}}
                className='bg-slate-900 max-w-56 min-w-48 md:h-56  h-52 p-3 flex hover:cursor-pointer rounded-2xl hover:bg-slate-800 '
                // className="flex-shrink-0 w-44 h-52  flex md:w-52 bg-slate-900 rounded-2xl p-3"
                
               onClick={()=>{SetInput(example1);load(example1)}} >
                <p>Suggest beautiful places to see on an upcomming road trip</p>
                {/* <img className='w-6 self-end ' src={assets.compass_icon} alt="" /> */}
                <LiaCompass className='w-20 h-8 self-end' />
             </motion.div>

             <motion.div
               initial={{opacity:0}}
               animate={{ opacity: 1 }}
               transition={{duration:1,delay:0.8,ease:easeOut}}
               className='bg-slate-900 max-w-56 min-w-52  h-52 md:h-56 p-3 hover:cursor-pointer flex rounded-2xl hover:bg-slate-800'
              // className="flex-shrink-0 w-44 h-52 flex md:w-52  bg-slate-900 rounded-2xl p-3"
              onClick={()=>{SetInput(example2);load(example2)}} >
               <p>Give me a basic guide on how to cultivate a growth mindset</p>
               <SlBulb className='w-12 h-8 self-end' />
               {/* <img className='w-6 self-end '  src={assets.bulb_icon} alt="" /> */}
              </motion.div>

              <motion.div
                 initial={{opacity:0}}
                  animate={{ opacity: 1 }}
                  transition={{duration:1,delay:1,ease:easeOut}}
                  className='bg-slate-900 max-w-56 min-w-52 h-52 md:h-56 flex hover:cursor-pointer  p-3  rounded-2xl hover:bg-slate-800'
                  // className="flex-shrink-0 w-44 h-52 flex md:w-52  bg-slate-900 rounded-2xl p-3"
                  onClick={()=>{SetInput(example3);load(example3)}}>
                 <p>Brainstrom team bonding activities for our work retreat</p>
                  {/* <img className='w-6 self-end '  src={assets.message_icon} alt="" /> */}
                 <FaRegMessage className=' w-16 h-5 flex self-end mb-1  ' />
              </motion.div>

              <motion.div
                 initial={{opacity:0}}
                 animate={{ opacity: 1 }}
                 transition={{duration:1,delay:1.2,ease:easeOut}}
                 className='bg-slate-900 max-w-56 min-w-52 h-52 md:h-56 flex p-3 hover:cursor-pointer rounded-2xl hover:bg-slate-800 '
                // className="flex-shrink-0 w-44 h-52 flex md:w-52  bg-slate-900 rounded-2xl p-3"
                onClick={()=>{SetInput(example4);load(example4)}}>
                <p>Write a meal plan for one week using a mixture of proteins and vegetables that can be prepared in under 30 minutes</p>
                {/* <img className='w-6 self-end '  src={assets.code_icon} alt="" /> */}
               {/* <IoCodeSlashOutline className='w-16 h-6 self-end mb-[2px] ' /> */}
               <GiHotMeal className='w-24 h-8  self-end mb-[2px] ' />
             </motion.div>

      </div>
      </div>
       </div>:
       <div className='h-[70%]  ml-6 md:ml-[10%] '>
          <div className='flex items-center mt-5 gap-6 md:ml-6'>
          <img className='w-16 rounded-full' src={assets.user_icon} alt="" />
           <p>{recentPrompt}</p>
        </div>
        
        <div className='flex h-72 gap-3 mt-6 md:mt-5 md:ml-[10%] '>
          <img className={loading?'w-6 md:w-7 h-7  animate-spin ':'w-6 h-6 md:w-7 '} src={assets.gemini_icon} alt="" />
          {loading?
          <div className=' flex flex-col gap-3'>
            <hr  className='bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse   w-[300px]  md:w-[500px]  h-4 '  />
            <hr  className='bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse  w-[250px]  md:w-[450px]  h-4' />
            <hr  className='bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse  w-[200px] md:w-[300px] h-4' />
           </div>:
          <p className='overflow-y-scroll overflow-hidden scrollbar-hide md:w-[70%] w-[85%]   ' dangerouslySetInnerHTML={{__html:resultData}}></p>}
         
        </div>

        </div>}
      

      <motion.div
      initial={{opacity:0 , scaleX:0.9}}
      animate={{ opacity: 1, scaleX:1}}
      transition={{duration:0.5,delay:0.6,ease:easeOut}}

      className=' flex relative  flex-col h-14 justify-center  m-3 bg-slate-900 rounded-3xl w-[90%] ml-[6%] md:ml-[18%] md:w-[62%]   '>

          <div className='absolute flex right-6 hover:cursor-pointer '>
            {/* <img className='w-5' src={assets.gallery_icon} alt="" />
            <img className='w-5' src={assets.mic_icon} alt="" /> */}
            {/* <img onClick={()=>onSent()} className='w-5' src={assets.send_icon} alt="" /> */}
            <IoSend onClick={()=>onSent()} />
          </div>

        <div className=' '>
        <input onChange={(e)=>SetInput(e.target.value)} onClick={()=>SetSide(false)} value={input} className='bg-slate-900 p-3 outline-none rounded-3xl w-[80%] h-full    ' type="text" placeholder='Enter a prompt here' />
        </div>

       
        
       </motion.div>
       <motion.div
       initial={{opacity:0 , y:20}}
       animate={{ opacity: 1, y:0 }}
       transition={{duration:0.5,delay:0.6,ease:easeOut}}
 
       className=''>
       <p className='text-[12px] text-center md:ml-[7%] mb-2   md:text-xs ml-2  md:w-[80%]   '>Gemini may display inaccurate info, including about people, so double-check its responses</p>
       </motion.div>
       
    </div>
  )
}

export default Main