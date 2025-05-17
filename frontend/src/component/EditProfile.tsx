import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router";
import { colorMap } from "../App";
import axios from "axios";
import { API_url } from "../url";
import Loader from "./Loader";
import FeedbackMessage from "./FeedbackMessage";

function EditProfile() {

  const context=useContext(UserContext);
  const navigation=useNavigate();

  const [formData, setFormData] = useState({name:context?.user.name, bio:context?.user.bio})
  const [feedback, setFeedback] = useState<{type: 'success' | 'error', message: string} | null>(null);

  const [loading, setLoading] = useState(false)

  const handleSubmit=(e:any)=>{
    const token=localStorage.getItem("token")
    e.preventDefault();
    setLoading(true);
    axios.put(`${API_url}/user/updateProfile`,formData,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((res)=>{
      setFeedback({type:"success",message:res.data.message});
      setLoading(false);
    }).catch(e=>{
      setLoading(false);
            //@ts-ignore
      setFeedback({type:"error",message:e});
    })
  }

  return (
    <>
    {loading && <Loader/>}
    {feedback?.message && <FeedbackMessage type={feedback.type} message={feedback.message} onClose={()=>setFeedback(null)}/>
        }
      <div className="flex  items-center py-4 shadow-md text-xl font-bold px-4 overflow-hidden ">
                <IoArrowBackSharp
                onClick={()=>{
                  navigation(-1)
                }}
                className="text-2xl z-5"/>
                <div className="w-full flex justify-center ml-[-29px] tracking-wider "><h1>Edit Profile</h1></div>
          </div>

          <div className="flex flex-col items-center px-8">
            <div className={`${colorMap[context?.user.picture || 0]} ml-[-29px] w-20 h-20 mt-8 text-white flex justify-center text-4xl pb-2 items-center font-semibold rounded-full`}>{context?.user.name.charAt(0)}</div>   

            <form onSubmit={handleSubmit} className="flex flex-col mt-5 w-full h-auto gap-1 relative" >
              <label className="uppercase text-md font-medium ">Name</label>
              <input type="text" onChange={(e)=>{
                setFormData({...formData,name:e.target.value})
              }} value={formData.name} className=" py-2 px-3 rounded-xl bg-[#c5c3c3a0] border-gray-600"></input>

              <label className="uppercase text-md font-medium mt-2">Email</label>
              <input type="text"  value={context?.user.email}
              readOnly
              className=" py-2 px-3 rounded-xl bg-[#c5c3c3a0] border-gray-600 outline-none"></input>

              <label className="uppercase text-md font-medium mt-2">Bio</label>
              <textarea 
              onChange={(e)=>{
                setFormData({...formData,bio:e.target.value})
              }}
              value={formData.bio} placeholder="Write you bio" className=" py-2 px-4 rounded-xl bg-[#c5c3c3a0] border-gray-600 h-25 "></textarea>

              <button type="submit" className="bg-black p-3 text-white font-semibold rounded-xl  absolute w-full left-0 top-100">Save Changes</button>
            </form> 
          </div>
    </>
  )
}

export default EditProfile