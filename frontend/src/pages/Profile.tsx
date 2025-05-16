import { NavLink, Outlet } from "react-router"
import BottomBar from "../component/BottomBar"
import ProfileMain from "../component/ProfileMain"

function Profile() {
  return (
    <>
    <ProfileMain/>
    <div className="flex gap-3 px-6 w-full justify-center">
           <div className="w-full lg:w-[60%] mt-2 tracking-wider text-lg sm:w-[70%] flex gap-3">
             <NavLink to={`/profile`} end>Posts</NavLink>
            <NavLink to={`/profile/liked`}>Liked</NavLink>
            <NavLink to={`/profile/saved`}>Saved</NavLink>
           </div>
           
    </div>

    <div className="flex gap-3 px-6 w-full justify-center">
        <div className="w-full lg:w-[60%] mt-2  sm:w-[70%] flex gap-3">
            <Outlet/>
        </div>
        
    </div>
    <BottomBar/>
    </>
  )
}

export default Profile