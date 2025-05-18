import { IoArrowBackSharp } from "react-icons/io5"
import { useNavigate, useParams } from "react-router"
import { colorMap } from "../App";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_url } from "../url";
import Loader from "./Loader";
import Blog1 from "./1Blog";


function OtherProfile() {
    const navigation=useNavigate();
    const [user, setUser] = useState({name:'',email:'',bio:'',picture:'',posts:[],});
    const [loading, setLoading] = useState(false)

    const {id}=useParams()
    const token=localStorage.getItem("token");

    useEffect(()=>{
      setLoading(true)
      axios.get(`${API_url}/user/profile/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }).then((res)=>{
        console.log(res.data.user)
        setUser(res.data.user)
        setLoading(false)
      }).catch(()=>{
        setLoading(false)
      })
    },[])

  return (
    <>
    {loading && <Loader/>}
    <div className="flex  items-center py-4 shadow-md text-xl font-bold px-5  overflow-hidden ">
          <IoArrowBackSharp
          onClick={()=>{
            navigation('/')
          }}
          className="text-2xl z-5"/>
          <div className="w-full flex justify-center tracking-wider "><h1>{user.name}</h1></div>
    </div>
    
    <div className="flex flex-col items-center w-full px-4 overflow-hidden sm:px-10 md:mt-7 md:px-[120px] lg:px-[200px]">
        <div className=" h-30  flex  items-center px-2 gap-3 sm:gap-6 rounded  w-full sm:px-4 justify-center md:pl-[-100px] lg:pr-[150px]">
        <div className={`w-15 h-15 sm:w-25 sm:h-25 lg:w-30 lg:h-30 rounded-full ${colorMap[user?.picture || 0]} flex justify-center items-center text-white font-medium text-2xl md:text-4xl lg:text-5xl`} >
            {user.name.charAt(0)}
        </div>
        <div>
            <h1 className="mt-2  md:mt-[5px] text-lg md:text-2xl font-semibold">{user.name}</h1>
            <h1 className="mt-[-8px] w-45 sm:w-auto overflow-hidden text-sm text-gray-500 " >{user.email}</h1>
        </div>
        <div
        className=" p-1 rounded flex justify-center items-center w-12 text-xs gap-0.5 mb-2 sm:mb-6 font-semibold"></div>
    </div>
    
        <div className="flex lg:w-[80%] lg:mt-5 justify-evenly h-15 gap-6 mt-[-5px] w-full pt-1.5 border-t border-gray-500 border-b mb-1 sm:mt-2 ">
            <div className="flex flex-col items-center">
                <h1 className="text-lg font-semibold">{user?.posts.length}</h1>
                <h1 className="font-bold text-gray-600 tracking-wider mt-[-5px] uppercase text-sm">Posts</h1>
            </div>
            <div className="flex flex-col items-center">
                <h1 className="text-lg font-semibold">50</h1>
                <h1 className="font-bold text-gray-600 tracking-wider mt-[-5px] uppercase text-sm">Followers</h1>
            </div>
            <div className="flex flex-col items-center">
                 <h1 className="text-lg font-semibold">20</h1>
                <h1 className="font-bold text-gray-600 tracking-wider mt-[-5px] uppercase text-sm">Following</h1>
            </div>
        </div>

        <div className="w-full lg:w-[80%]">
            {user.bio ? <div className="w-full h-32  mt-2 border-2 border-gray-700 rounded-xl px-6 text-lg capitalize py-3 overflow-hidden leading-tight">
            {user.bio}
        </div> :
        <div className="w-full h-32  mt-2 border-2 border-gray-700 rounded-xl px-6 text-lg capitalize py-3 overflow-hidden leading-tight">
            No Bio ... 
        </div>
        }
        </div>
    </div>
    <div className="flex gap-3 px-6 w-full justify-center">
          <div className="w-full lg:w-[60%] mt-2 tracking-wider text-lg sm:w-[70%] flex gap-3">
            Posts
        </div>
    </div>
    <Blog1 isProfilePost={false} blog={user?.posts} hasMore={false} ref={false}/>
    </>
  )
}

export default OtherProfile