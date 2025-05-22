import { useContext, useState } from "react"
import TopBar from "../component/TopBar"
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { API_url } from "../url";
import Loader from "../component/Loader";
import FeedbackMessage from "../component/FeedbackMessage";

function UpdatePassword() {
    const [formData, setFormData] = useState({currentPassword:'',updatePassword:'',conformPassword:''});
    const [message,setMessage]=useState(false);
    const [feedback,setFeedback]=useState<{type:"success" | "error",message :string} | null>(null)
    const [loading, setLoading] = useState(false)

    const token=localStorage.getItem("token")
    const context=useContext(UserContext);
    const handleSubmit=(e:any)=>{
        e.preventDefault();
        if(context?.user.password!==formData.currentPassword){
            setMessage(true);
        }else{
            setMessage(false);
            setLoading(true)
            axios.put(`${API_url}/user/updatePassword`,formData,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }).then((res)=>{
                setLoading(false);
                setFormData({currentPassword:'',updatePassword:'',conformPassword:''})
                setFeedback({type:"success",message:res.data.message})
            }).catch(e=>{
                setLoading(false)
            //@ts-ignore
            setFeedback({type:"error",message:e.data.message})
            })
        }
    }
  return (
    <>
    <TopBar navigate="/setting" value="Security"/>
      {loading && <Loader/>}
    {feedback?.message && <FeedbackMessage type={feedback.type} message={feedback.message} onClose={()=>{setFeedback(null)}}/>}
     <div className="h-auto w-full md:w-[70%] xl:w-[50%] flex justify-center mt-4  gap-2 px-6 flex-col ">
        <div className="w-full h-auto rounded-xl mt-2 px-3 py-3">
            <form onSubmit={handleSubmit}>
                <h1>Current Password</h1>
            <input minLength={6}  
            value={formData.currentPassword}
            onChange={(e)=>{
                setFormData({...formData,currentPassword:e.target.value})
            }} type="text" className="border px-2 py-1 mt-2 w-[80%] rounded" required></input>
            <div className="h-3 px-1">{message && <div className="text-red-500 text-sm">password not matched</div>}</div>
             <h1 className="mt-1">Updated Password</h1>
            <input 
            value={formData.updatePassword}
            minLength={6} onChange={(e)=>{
                setFormData({...formData,updatePassword:e.target.value})
            }}
            type="password" className="border px-2 py-1 mt-2 w-[80%] rounded" required></input>
             <h1 className="mt-3">Conform Updated Password</h1>
            <input 
            value={formData.conformPassword}
            minLength={6} onChange={(e)=>{
                setFormData({...formData,conformPassword:e.target.value})
            }}
            type="password" className="border px-2 py-1 mt-2 w-[80%] rounded" required></input>
            <div className="h-6 px-1 text-sm">{(formData.updatePassword!==formData.conformPassword)&& <div className="text-red-500 ">password not matched</div>}
            </div>
            <button type="submit" disabled={formData.updatePassword!==formData.conformPassword} className="bg-black px-4 mt-5 rounded text-white text-lg py-1">Update Password</button>
            </form>
        </div>
     </div>
    </>
  )
}

export default UpdatePassword