import { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { API_url } from "../url";
import axios from "axios";
import { useInView } from 'react-intersection-observer';
import type { item } from "../App";



function Blogs() {
  let PazeSize=4;
  const context=useContext(UserContext)
  //@ts-ignore
  const [likeCount, setLikeCount] = useState(20);
  const [isLiked,setIsLiked]=useState(false);
  const [isSaved, setIsSaved] = useState(false);
  //@ts-ignore
  const [blog,setBlog]=useState([...context?.blog]);
  const [skip, setSkip] = useState(4);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const fetchPosts = async () => {
    const token=localStorage.getItem("token")
    try{
      const res = await axios.get(`${API_url}/blog/bulk?skip=${skip}&take=${PazeSize}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      if(res.data){
        let newPosts=res.data.posts
        if (newPosts.length < PazeSize) setHasMore(false);
        setBlog(prev => [...prev, ...newPosts]);
        setSkip(prev => prev + PazeSize);
      }
    }catch(e){
      setHasMore(false)
    }
  };


  useEffect(() => {
    if (inView && hasMore)  fetchPosts();
  }, [inView]);

  const saveBlog=(postId:number)=>{
    const token=localStorage.getItem("token")
    axios.put(`${API_url}/user/saveblog`,{postId},{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).catch(e=>{
      console.log(e)
    })
  }

  const unSaveblog=(postId:number)=>{
    const token=localStorage.getItem("token")
    axios.delete(`${API_url}/user/unsaveblog/${postId}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).catch(e=>{
      console.log(e)
    })
  }



  return (
    
    <div className=" px-8 mt-2 sm:px-20 sm:mt-6 md:px-[120px] md:mt-7 lg:px-[200px] lg:mt-7 mb-20 ">
      {blog?.map((item:item)=>{
        return(
        <div className="border-b mt-2" key={item.id}>
        <div className="flex items-end gap-1 mb-1 w-full">
        <div className="w-7 h-7 rounded-full bg-blue-600 flex justify-center text-white items-center pb-0.5">{item.author?.name.charAt(0)}</div>
        <h1 className="text-md font-semibold md:text-lg md:ml-1">{item.author?.name}</h1>
        <h2 className="flex text-xs pb-1 ml-2 sm:text-sm  ">{item.updatedAt?.split("T")[0]}</h2>
        </div>
        <h1 className="font-semibold text-xl md:text-2xl overflow-hidden mt-1 pl-1">{item.title}</h1>
        <p className=" text-md md:text-lg text-wrap mt-1 pl-1 max-h-21 md:max-h-25 overflow-y-hidden">{item.content}</p>
        {/* like count */}

        <div className="flex justify-between items-center mt-1">
        <div className="flex gap-1 items-center mb-2 mt-1">
        {isLiked ? <FaHeart className={`text-xl  text-red-500 duration-200 md:text-2xl`} onClick={()=>{
          setIsLiked(prev=>!prev);
        }}/>:<CiHeart className="text-xl duration-200 md:text-2xl" onClick={()=>{
          setIsLiked(prev=>!prev);
        }}/>}<span>{isLiked ? item.likeCount+1 : item.likeCount}</span></div>

        {/* Saved */}

        <div
          className="w-fit hover:cursor-pointer"
          key={item.id}
          onClick={() => {
            if(!item?.savedBy?.some(x => x.postId === item.id && x.userId===context?.user.id)){
              saveBlog(item.id);
            }else{
              unSaveblog(item.id);
            }
            }}
        >
          {item?.savedBy?.some(x => (x.postId === item.id && x.userId ===context?.user.id )) ? (
            <FaBookmark className="text-xl mr-5 md:text-2xl z-10 relative" />
          ) : (
            <CiBookmark className="text-xl mr-5 md:text-2xl" />
          )}
        </div>

        </div>
      </div>
        )
      })}
      {hasMore && <div ref={ref} className="flex justify-center mt-3">
        <div className="w-12 h-12 border-4 border-black border-dashed border-t-transparent rounded-full animate-spin"></div>
      </div>}
    </div>
  )
}

export default Blogs