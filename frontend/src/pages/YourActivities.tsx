import { NavLink, Outlet, useNavigate } from "react-router"
import { IoArrowBackSharp } from "react-icons/io5"

function YourActivities() {
    const navigation=useNavigate()
  return (
    <>
    <div className="flex items-center py-4 shadow-md text-xl font-bold px-5  overflow-hidden ">
                  <IoArrowBackSharp
                  onClick={()=>{
                    navigation('/setting')
                  }}
                  className="text-2xl z-5"/>
                  <div className="w-full flex justify-center tracking-wider ml-[-25px]"><h1>Activity</h1></div>
     </div>  
    <div className="flex gap-3 px-6 w-full justify-center ">
           <div className="w-full lg:w-[60%] mt-4 tracking-wider text-lg sm:w-[70%] flex gap-3">
             <NavLink to={`/activity`} end>Liked</NavLink>
            <NavLink to={`/activity/saved`}>Saved</NavLink>
           </div>
    </div>
    <div className="xl:w-[90%] xl:ml-20 xl:flex xl:flex-col mt-4">
      <Outlet/>
    </div>
    </>
  )
}

export default YourActivities