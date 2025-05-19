import { useEffect, useState } from "react";
import { colorMap, type Author } from "../App";
import { useNavigate } from "react-router";
import { API_url } from "../url";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { FaSpinner } from "react-icons/fa";

function Hero() {

  const [isSearch, setIsSearch] = useState(false);
  const [searchData,setSearchData]=useState('');
   const [isLoading, setIsLoading] = useState(false);
  const [data,setData]=useState([]);

  const navigation=useNavigate()
    const token=localStorage.getItem("token")

 const handleSubmit=()=>{
    console.log(searchData);
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
    if(searchData.trim() !=="" && isSearch){
      setIsLoading(true)
      handleSubmit();
    }
    if(searchData.trim() ==="" ){
      setData([])
      setIsLoading(false)
      setIsSearch(false)
    }
  },[isSearch ,searchData])

  return (
    <div className="flex flex-col items-center justify-center bg-white text-center px-8 md:px-6 mt-18 sm:mt-21">
      <h1 className="text-3xl font-bold md:text-6xl mt-4 md:mt-8 md:px-5 xl:text-7xl lg:font-extrabold">
        Welcome To Blogify
      </h1>
      <p className="text-lg md:text-2xl text-gray-600 max-w-2xl px-8 md:mt-3 mt-1 tracking-wide mb-3 sm:mb-0">
        The easiest way to share your thoughts, stories, and experiences with the world...
      </p>
      <div className="px-5 w-full hidden md:w-[35rem] p-2 mt-3 sm:flex  sm:flex-row md:items-center gap-1 relative">
        <input
          value={searchData}
          onChange={(e)=>{
            setSearchData(e.target.value)
          }}
          type="text"
          placeholder="Search for blogs, peoples, etc.."
          className="border-2 rounded-lg w-full p-1.5 outline-0 pl-3 pr-10"
        />
        {isLoading && <FaSpinner className="absolute right-32 top-1/2 -translate-y-1/2 animate-spin text-black" />
        }
        <button onClick={()=>{
          setIsSearch(true)
        }} className="w-fit mt-2 sm:mt-0 bg-black text-white text-lg px-4 p-1.5 rounded-xl ml-1">
          Search
        </button>
        {isSearch && 
        <div className="flex flex-col items-center px-6 py-1 absolute top-12 w-full left-0 bg-white z-50 pr-12 mt-1">
          {!isLoading && <div className="flex justify-end w-full text-xl pr-2 mt-1">
            <RxCross2
                    onClick={() => setIsSearch(false)}
                /></div>
            }
            {!isLoading && data?.slice(0,5).map((user:Author)=>{
              return(
                <div className="shadow border rounded-xl px-3 py-2 border-gray-400 w-full mt-2 flex items-end gap-1.5" key={user.id} onClick={()=>{
                       navigation(`/profile/${user.id}`)
                }}>
                <div className={`w-10 h-10 flex justify-center items-center text-lg font-semibold text-white ${colorMap[user.picture]} rounded-full`}>{user.name.charAt(0)}</div>
                  <h1 className="text-lg mb-1">{user.name}</h1>
                  </div>
              )
          })}
          {(data.length ===0  && !isLoading) && <div>No User Found</div>}
          </div>
        }
      </div>
    </div>
  );
}

export default Hero;
