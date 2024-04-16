import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props)=>{

    const [input,SetInput] = useState("")
    const [recentPrompt,SetRecentPrompt] = useState("")
    const [prevPrompt,SetPrevPrompts] = useState([])
    const [showResult,SetShowresult] = useState(false)
    const [loading,SetLoading] = useState(false)
    const [resultData,SetResultData] =useState("")

const newChat =()=>{
 SetShowresult(false)
 SetLoading(false)
}
    

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
           response = await runChat(input)
        }
    console.log(response)
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