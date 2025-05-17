import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { API_url } from "../url";
import axios from "axios";
import { useInView } from 'react-intersection-observer';

import Blog1 from "./1Blog";



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
    
    <Blog1 hasMore={hasMore} isProfilePost={false} ref={ref} blog={blog}/>
  )
}

export default Blogs