import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { API_url } from "../url";
import axios from "axios";
import { useInView } from 'react-intersection-observer';
import type { item } from "../App";
import LikeComponent from "./LikeComponent";
import SavedBlog from "./SavedBlog";



function Blogs() {
  let PazeSize=4;
  const context=useContext(UserContext)
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
  

 


  return (
    
    <div className=" px-8 mt-2 sm:px-20 sm:mt-6 md:px-[120px] md:mt-7 lg:px-[200px] lg:mt-7 mb-25 ">
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
          <LikeComponent item={item}/>
        {/* Saved */}

        <SavedBlog item={item}/>
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