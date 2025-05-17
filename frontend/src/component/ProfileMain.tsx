import { useContext } from "react";
import { IoArrowBackSharp } from "react-icons/io5"
import { useNavigate } from "react-router"
import { MdOutlineModeEdit } from "react-icons/md";

import { UserContext } from "../context/UserContext";
import { colorMap } from "../App";

function ProfileMain() {
    const navigation=useNavigate();
    const context=useContext(UserContext);
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
    
    <div className="flex flex-col items-center w-full px-4 overflow-hidden sm:px-10 md:mt-7 md:px-[120px] lg:px-[200px]">
        <div className=" h-30  flex  items-center px-2 gap-3 sm:gap-6 rounded  w-full sm:px-4 justify-center md:pl-[-100px] lg:pr-[150px]">
        <div className={`w-15 h-15 sm:w-25 sm:h-25 lg:w-30 lg:h-30 rounded-full ${colorMap[context?.user?.picture || 0]} flex justify-center items-center text-white font-medium text-2xl`} >
            {context?.user.name.charAt(0)}
        </div>
        <div>
            <h1 className="mt-2  md:mt-[5px] text-lg md:text-2xl font-semibold">{context?.user.name}</h1>
            <h1 className="mt-[-8px] w-45 sm:w-auto overflow-hidden text-sm text-gray-500 " >{context?.user.email}</h1>
        </div>
        <button
        onClick={()=>{
            navigation("/editProfile")
        }}
        className="border p-1 rounded flex justify-center items-center text-xs gap-0.5 mb-2 sm:mb-6 font-semibold"><MdOutlineModeEdit className="mt-0.5"/>Edit</button>
    </div>
    
        <div className="flex lg:w-[80%] lg:mt-5 justify-evenly h-15 gap-6 mt-[-5px] w-full pt-1.5 border-t border-gray-500 border-b mb-1 sm:mt-2 ">
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

        <div className="w-full lg:w-[80%]">
            {context?.user.bio ? <div className="w-full h-32  mt-2 border-2 border-gray-700 rounded-xl px-6 text-lg capitalize py-3 overflow-hidden leading-tight">
            {context?.user.bio}
        </div> :
        <div className="w-full h-32  mt-2 border-2 border-gray-700 rounded-xl px-6 text-lg capitalize py-3 overflow-hidden leading-tight">
            write your bio ... 
        </div>
        }
        </div>
    </div>

    </>
  )
}

export default ProfileMain