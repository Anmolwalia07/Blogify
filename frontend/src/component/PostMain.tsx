import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { API_url } from "../url";
import Loader from "./Loader";
import FeedbackMessage from "./FeedbackMessage";
import { useNavigate } from "react-router";

function PostMain() {
    const context=useContext(UserContext)
    const [post, setPost] = useState({title:context?.post.title,content:context?.post.content,publish:false})
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState<{type: 'success' | 'error', message: string} | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [draftedPostCount, setDraftedPostCount] = useState<number|undefined>(context?.draftedCount)
    const [changeInDraftCount,setChangeInDraftCount]=useState(false)
    
    const navigation=useNavigate()

    const handleInput = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto"; // reset the height
        textarea.style.height = textarea.scrollHeight + "px"; // set to content height
      }
    };


    const handlePublish=async()=>{
        const token=localStorage.getItem("token")
        try{
            setLoading(true);
            const response=await axios.post(`${API_url}/blog/create`,{...post,publish:true},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(response.data){
                context?.setPost({title:'',content:''})
                setPost({title:'',content:'',publish:false});
                setLoading(false);
                console.log(response.data);
                setFeedback({type:"success",message:response.data.message})
            }
        }catch(e){
            setLoading(false);
            //@ts-ignore
            setFeedback({type:"error",message:e?.response?.data.message});
        }
    }

    const savedHandle =async()=>{
        const token=localStorage.getItem("token")
        try{
            setLoading(true);
            const response=await axios.post(`${API_url}/blog/create`,{...post},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(response.data){
                context?.setPost({title:'',content:''})
                setPost({title:'',content:'',publish:false});
                setLoading(false);
                console.log(response.data);
                setFeedback({type:"success",message:response.data.message});
                setChangeInDraftCount(true);
            }
        }catch(e){
            setLoading(false);
            //@ts-ignore
            setFeedback({type:"error",message:e?.response?.data.message});
        }
    }

    function draftedCount(){
        const token=localStorage.getItem("token")
        setLoading(true)
        axios.get(`${API_url}/blog/drafted/count`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then((res)=>{
            if(res.data){
                setDraftedPostCount(res.data.totalPost);
                setLoading(false)
            }
        }).catch(e=>{
            setLoading(false)
            console.log(e);
        })
    }

    useEffect(()=>{
        draftedCount();
    },[changeInDraftCount])

  return (
    <div className="mt-15 w-full h-auto flex flex-col items-center mb-20">
        {loading && <Loader/>}
        {feedback?.message && <FeedbackMessage type={feedback.type} message={feedback.message} onClose={()=>setFeedback(null)}/>
        }
        <div className="flex justify-between w-[75%] h-fit mt-8  ">
            <div className="w-full lg:w-fit flex gap-8 justify-between
            ">
                <button 
                onClick={()=>{
                    navigation("/blog/drafted")
                }}
                //@ts-ignore
                className="text-lg underline p-1 hover:cursor-pointer relative">Drafted{draftedPostCount >=1 &&<span className="w-4 h-4 flex justify-center items-center rounded-full text-white bg-black absolute top-1 right-[-7px]">{ draftedPostCount}</span>}</button>
                <button 
                onClick={savedHandle}
                className="text-lg border p-1 px-2 rounded-lg hover:cursor-pointer hover:bg-gray-200">Saved</button>
            </div>
            <div className="lg:flex gap-6 hidden">
                <button
                onClick={handlePublish}
                className="text-lg text-white bg-green-600 rounded-xl p-1 px-3 hover:cursor-pointer hover:bg-green-700">Publish</button>
            </div>
        </div>

        <div className="w-[80%] bg-[#cfcfcf] lg:mt-15 mt-8 flex flex-col px-5 py-4 h-auto"> 
            <input 
            value={context?.post.title}
            onChange={(e)=>{
                setPost({...post,title:e.target.value})
                context?.setPost({...context.post,title:e.target.value})
            }}
            type="text" placeholder="title" className="md:text-4xl text-3xl border-b outline-0 "/>
            <textarea
                onChange={(e)=>{
                    setPost({...post,content:e.target.value})
                    context?.setPost({...context.post,content:e.target.value})
                }}
                value={context?.post.content}
                ref={textareaRef}
                onInput={handleInput}
                className="md:text-3xl text-2xl mt-2 outline-0 border-b w-full resize-none overflow-hidden py-3 min-h-30 md:min-h-40 "
                placeholder="your story"
                rows={1}
                ></textarea>        
        </div>

        <div className="flex justify-center w-[75%] gap-6 lg:hidden mt-5">
            <button
            onClick={handlePublish}
            className="text-lg text-white bg-green-600 rounded-xl p-1 px-3 hover:cursor-pointer hover:bg-green-700">Publish</button>

        </div>
    </div>
  )
}

export default PostMain