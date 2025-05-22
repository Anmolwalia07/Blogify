import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API_url } from "../url";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { colorMap, type Author } from "../App";
import BottomBar from "../component/BottomBar";

function SearchPage() {

const [searchData, setSearchData] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false);
  const [data,setData]=useState([]);

  const navigation=useNavigate()
    const token=localStorage.getItem("token")

 const handleSubmit=()=>{
    axios.get(`${API_url}/user/find?search=${searchData}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((res)=>{
      setData(res.data.users);
      setIsLoading(false)
    })
  }

  useEffect(()=>{
    if(searchData.trim() !==""){
      setIsLoading(true)
      handleSubmit();
    }else{
      setIsLoading(false)
      setData([])
    }
  },[searchData])

  return (
    <div className="w-full min-h-[93vh] bg-white absolute top-0  z-[99] pb-16" >
        <div className="flex justify-center px-6 py-4 gap-2 text-lg shadow relative">
         <input
        type="text"
        placeholder="Search"
        value={searchData}
        onChange={(e) => setSearchData(e.target.value)}
        className="border w-full p-1.5 rounded-lg px-3 pr-10 capitalize"
      />
      {isLoading && (
        <FaSpinner className="absolute right-25 top-1/2 -translate-y-1/2 animate-spin text-black" />
      )}
          <button onClick={()=>{
            navigation(-1)
          }}>Cancel</button>
          </div>

          <div className="flex flex-col items-center px-5 py-1">
            {data?.map((user:Author)=>{
            return(
              <div className="shadow border rounded-xl px-3 py-2 border-gray-400 w-full mt-2 flex items-end gap-1.5" key={user.id} onClick={()=>{
               navigation(`/profile/${user.id}`)
              }}>
                <div className={`w-10 h-10 flex justify-center items-center text-lg font-semibold text-white ${colorMap[user.picture]} rounded-full`}>{user.name.charAt(0)}</div>
                <h1 className="text-lg mb-1">{user.name}</h1>
              </div>
            )
          })}
          {(!isLoading && data.length==0 && searchData!="" )&&
          <div className="text-lg mt-2">No User</div>
          }
          </div>
          <BottomBar/>
        </div>
  )
}

export default SearchPage