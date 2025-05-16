import { useContext } from "react";
import { IoArrowBackSharp } from "react-icons/io5"
import { useNavigate } from "react-router"
import { MdOutlineModeEdit } from "react-icons/md";

import { UserContext } from "../context/UserContext";

function ProfileMain() {
    const navigation=useNavigate();
    const context=useContext(UserContext)
  return (
    <>
    <div className="flex  items-center py-4 shadow-md text-xl font-bold px-4 overflow-hidden ">
          <IoArrowBackSharp
          onClick={()=>{
            navigation('/')
          }}
          className="text-2xl z-5"/>
          <div className="w-full flex justify-center ml-[-32px] tracking-wider "><h1>Profile</h1></div>
    </div>
    
    <div className="flex flex-col items-center w-full px-4 overflow-hidden sm:px-10">
        <div className=" h-30 mt-3 flex  items-center px-2 gap-3 sm:gap-6 rounded  w-full sm:px-4 md:pl-[100px] lg:pl-[350px]">
        <div className={`w-15 h-15 sm:w-25 sm:h-25 rounded-full bg-${context?.user.picture}-600 flex justify-center items-center text-white font-medium text-2xl`} >
            {context?.user.name.charAt(0)}
        </div>
        <div>
            <h1 className="mt-2 lg:mt-[-15px] md:mt-[5px] text-lg md:text-2xl font-semibold">{context?.user.name}</h1>
            <h1 className="mt-[-8px] w-45 sm:w-auto overflow-hidden text-sm text-gray-500 " >{context?.user.email}</h1>
        </div>
        <button className="border p-1 rounded flex justify-center items-center text-xs gap-0.5 mb-2 sm:mb-6 font-semibold"><MdOutlineModeEdit className="mt-0.5"/>Edit</button>
    </div>
    
        <div className="flex justify-evenly h-15 gap-6 w-full pt-1.5 border-t border-gray-500 border-b mb-1 sm:mt-2">
            <div>
                <h1 className="text-lg font-semibold">{context?.user.posts.length}</h1>
                <h1 className="font-bold text-gray-600 tracking-wider mt-[-5px] uppercase text-sm">Posts</h1>
            </div>
            <div>
                <h1 className="text-lg font-semibold">{context?.user.likedPosts.length}</h1>
                <h1 className="font-bold text-gray-600 tracking-wider mt-[-5px] uppercase text-sm">Liked</h1>
            </div>
            <div>
                 <h1 className="text-lg font-semibold">{context?.user.savedPosts.length}</h1>
                <h1 className="font-bold text-gray-600 tracking-wider mt-[-5px] uppercase text-sm">Saved</h1>
            </div>
        </div>
    </div>

    </>
  )
}

export default ProfileMain