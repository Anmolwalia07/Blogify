import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router";
import { colorMap } from "../App";
import axios from "axios";
import { API_url } from "../url";
import Loader from "../component/Loader";
import FeedbackMessage from "../component/FeedbackMessage";

function EditProfile() {

  const context=useContext(UserContext);
  const navigation=useNavigate();

  const [formData, setFormData] = useState({name:context?.user?.name, bio:context?.user?.bio , picture:context?.user.picture})
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

          
          <div className="flex flex-col items-center  w-full  ">
            <div className="w-full md:w-[70%] xl:w-[50%]  flex flex-col items-center ">
              <div className={`${colorMap[formData?.picture || 0]} ml-[-29px] w-20 h-20 mt-8 text-white flex justify-center text-4xl pb-2 items-center font-semibold rounded-full`}>{context?.user.name.charAt(0)}</div>   

             <div className="mt-2 flex gap-1 ml-[-10px]">
              <div onClick={()=>{
                setFormData({...formData,picture:"blue"})
              }} className="bg-blue-500  w-10 h-10 rounded-full"></div>
              <div onClick={()=>{
                setFormData({...formData,picture:"green"})
              }} className="bg-green-500  w-10 h-10 rounded-full"></div>
              <div onClick={()=>{
                setFormData({...formData,picture:"red"})
              }} className="bg-red-500  w-10 h-10 rounded-full"></div>
              <div onClick={()=>{
                setFormData({...formData,picture:"orange"})
              }} className="bg-orange-500  w-10 h-10 rounded-full"></div>
              <div onClick={()=>{
                setFormData({...formData,picture:"pink"})
              }} className="bg-pink-500  w-10 h-10 rounded-full"></div>
              <div onClick={()=>{
                setFormData({...formData,picture:"yellow"})
              }} className="bg-yellow-500  w-10 h-10 rounded-full"></div>

              </div>   

            <form onSubmit={handleSubmit} className="flex flex-col mt-5 w-full  gap-1 px-8 " >
              <label className="uppercase text-md font-medium ">Name</label>
              <input type="text" onChange={(e)=>{
                setFormData({...formData,name:e.target.value})
              }} value={formData?.name} className=" py-2 px-3 rounded-xl bg-[#c5c3c3a0] border-gray-600"></input>

              <label className="uppercase text-md font-medium mt-2">Email</label>
              <input type="text"  value={context?.user.email}
              readOnly
              className=" py-2 px-3 rounded-xl bg-[#c5c3c3a0] border-gray-600 outline-none"></input>

              <label className="uppercase text-md font-medium mt-2">Bio</label>
              <textarea 
              onChange={(e)=>{
                setFormData({...formData,bio:e.target.value})
              }}
              value={formData?.bio} placeholder="Write you bio" className=" py-2 px-4 rounded-xl bg-[#c5c3c3a0] border-gray-600 max-h-25 min-h-25"></textarea>

              <button type="submit" className="cursor-pointer bg-black p-3 text-white font-semibold rounded-xl mt-15">Save Changes</button> 
            </form> 
            </div>
          </div>
    </>
  )
}

export default EditProfile