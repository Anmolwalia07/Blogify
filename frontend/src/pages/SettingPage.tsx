import { IoArrowBackSharp } from "react-icons/io5"
import { useNavigate } from "react-router"

function SettingPage() {
    const navigation=useNavigate()
  return (
    <>
     <div className="flex items-center py-4 shadow-md text-xl font-bold px-5  overflow-hidden ">
              <IoArrowBackSharp
              onClick={()=>{
                navigation(-1)
              }}
              className="text-2xl z-5"/>
              <div className="w-full flex justify-center tracking-wider ml-[-25px]"><h1>Settings</h1></div>
        </div>

       <div className="flex flex-col items-center  w-full  ">
       <div className="h-auto w-full md:w-[70%] xl:w-[50%] flex justify-center mt-5  gap-1 px-8 ">
       </div>
      </div>
    </>
  )
}

export default SettingPage