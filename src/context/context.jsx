import { createContext, useEffect, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props)=>{

    const [input,SetInput] = useState("")
    const [recentPrompt,SetRecentPrompt] = useState("")
    const [prevPrompt,SetPrevPrompts] = useState(()=>{
        const localPrompts = localStorage.getItem("prompts")
        return localPrompts ? JSON.parse(localPrompts) : []
    })
    const [showResult,SetShowresult] = useState(false)
    const [loading,SetLoading] = useState(false)
    const [resultData,SetResultData] =useState("")

    useEffect(()=>{
        if(prevPrompt.length > 0 ){
            
            localStorage.setItem("prompts",JSON.stringify(prevPrompt))
        }
    },[prevPrompt])

const newChat =()=>{
 SetShowresult(false)
 SetLoading(false)
}
    console.log(prevPrompt)
    

    const delayPara = (index,nextWord)=>{
        setTimeout(function() {
            SetResultData(pre=>pre+nextWord)
            
        },75*index);

    }

    const onSent = async (prompt)=>{
        SetResultData("")
        SetLoading(true)
        SetShowresult(true)
        let response;
        if(prompt !== undefined)
        {
           response = await runChat(prompt)
           
        }
        else
        {
        
           SetPrevPrompts(prev=>[...prev,input])
           SetRecentPrompt(input)
           SetInput("")
           response = await runChat(input)
           
        }
    
      let responseArr = response.split("**");
      let newRes = ""
      for (let i =0 ; i <responseArr.length ; i++)
      {
        if(i ===0 || i%2 !==1){
            newRes += responseArr[i];
        }
        else{
            newRes += "<b>"+responseArr[i]+"</b>"
        }
      }
      let newRes2 = newRes.split("*").join("</br>")
    
      let newResponseArr = newRes2.split(" ")
      for(let i=0; i<newResponseArr.length; i++)
      {
        const nextWord = newResponseArr[i]
        delayPara(i,nextWord+" ")
      }
      SetLoading(false)
      SetInput("")
    }

    const contextValue = {
        input,
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
    newChat}

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )

}

export default ContextProvider;