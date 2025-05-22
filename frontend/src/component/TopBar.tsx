
import { IoArrowBackSharp } from 'react-icons/io5'
import { useNavigate } from 'react-router'

function TopBar({value , navigate}:{value:string,navigate:string}) {
    const navigation=useNavigate()
  return (
<div className="flex items-center py-4 shadow-md text-xl font-bold px-5  overflow-hidden ">
              <IoArrowBackSharp
              onClick={()=>{
                navigation(navigate)
              }}
              className="text-2xl z-5"/>
              <div className="w-full flex justify-center tracking-wider ml-[-25px]"><h1>{value}</h1></div>
 </div>  
 )
}

export default TopBar