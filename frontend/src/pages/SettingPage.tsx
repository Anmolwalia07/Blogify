import { useNavigate } from "react-router"
import { CgProfile } from "react-icons/cg";
import { MdOutlineSystemSecurityUpdateGood } from "react-icons/md";
import { LuActivity } from "react-icons/lu";
import { LuBell } from "react-icons/lu";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { MdOutlineAccountCircle } from "react-icons/md";
import { TbMessageReport } from "react-icons/tb";
import TopBar from "../component/TopBar";




function SettingPage() {
    const navigation=useNavigate()
  return (
    <>
    <TopBar navigate="/profile" value="Settings"/>
       <div className="flex flex-col items-center  w-full ">
       <div className="h-auto w-full md:w-[70%] xl:w-[50%] flex justify-center mt-4  gap-2 px-6 flex-col ">
        <div className="w-full h-auto  shadow-lg rounded-xl mt-2 px-3 py-3">
          <h1 className="font-semibold text-lg">Account center</h1>
          <p className="text-xs">Manage your experience and account settings</p>
          <div className="flex gap-2 items-center text-sm mt-3"
          onClick={()=>{
            navigation('/editProfile')
          }}
          ><CgProfile /><h6>Profile details</h6></div>
          <div
          onClick={()=>{
            navigation('/passwordAndSecurity')
          }}
          className="flex gap-2 items-center text-sm mt-2"><MdOutlineSystemSecurityUpdateGood /><h6>Password and security</h6></div>
        </div>
        <div className="px-2 mt-3">
          <h1 className="text-gray-500">How you see ...</h1>
          <div className="flex gap-2 items-center mt-5 "
          onClick={()=>{
            navigation('/editProfile')
          }}><CgProfile className="text-lg"/><h6>Edit Profile</h6></div>
          <div
          onClick={()=>{
            navigation('/activity')
          }}
          className="flex gap-2 items-center mt-5"><LuActivity className="border-2 text-lg"/><h5>Your Activities</h5></div>
          <div className="flex gap-2 items-center mt-5"><LuBell className="text-lg"/><h5>Notifications</h5></div>
        </div>
         <div className="px-2 mt-3">
          <h1 className="text-gray-500">More info and Support</h1>
          <div className="flex gap-2 items-center mt-5"><IoMdHelpCircleOutline className="text-lg"/><h6>Help</h6></div>
          <div className="flex gap-2 items-center mt-5"><MdOutlineAccountCircle className="text-lg"/><h5>Account Status</h5></div>
          <div className="flex gap-2 items-center mt-5"><TbMessageReport className="text-lg"/><h5>Report a problem</h5></div>
        </div>
        <div className="tracking-wider text-red-500 mt-3 px-2" onClick={()=>{
           localStorage.removeItem("token");
           navigation("/login");
        }}>Logout...</div>
       </div>
      </div>
    </>
  )
}

export default SettingPage