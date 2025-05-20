import { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import axios from "axios";
import { API_url } from "../url";
import { UserContext } from "../context/UserContext";


function LikeComponent({id}:{id:number}) {
    const [hasPostId,setHavePostId]=useState(0);
    const [blogDetails,setBlogDetails]=useState({likedBy:[{userId:0,postId:0}],likeCount:0})
    const token=localStorage.getItem("token");
    const context=useContext(UserContext)

    useEffect(()=>{
        axios.get(`${API_url}/blog/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then((res)=>{
            setBlogDetails(res.data.blog)
        }).catch(err=>{
            console.log(err)
        })
    },[hasPostId])

     const unlikeBlog=(postId:number)=>{
        axios.delete(`${API_url}/user/unlikeblog/${postId}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }).then(()=>{
            
        }).catch(e=>{
          console.log(e)
        })

        axios.put(`${API_url}/blog/updateLikeCount/${postId}`,{likeCount:blogDetails.likeCount-1},{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }).then(()=>{
          setHavePostId(-1);
        }).catch(e=>{
          console.log(e)
        })
        
      }

      const likeBlog=(postId:number)=>{
        // setHavePostId(item.id);
        const token=localStorage.getItem("token");
        axios.post(`${API_url}/user/likeblog`,{postId},{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }).then(()=>{
        }).catch(e=>{
          console.log(e)
        })
        
        axios.put(`${API_url}/blog/updateLikeCount/${postId}`,{likeCount:blogDetails.likeCount+1},{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }).then(()=>{
            setHavePostId(id);
        }).catch(e=>{
          console.log(e)
        })
        
      }

  return (
    <div className="flex gap-1 items-center mb-2 mt-1 ml-1">
        {((blogDetails?.likedBy?.some(x=>x.postId === id && x.userId===context?.user.id)) || hasPostId===id )? <FaHeart className={`text-xl  text-red-500 duration-200 md:text-xl`} onClick={()=>{
            unlikeBlog(id)
        }}/>:<CiHeart className="text-xl duration-200 md:text-2xl" onClick={()=>{
            likeBlog(id);
        }}/>}<span>{blogDetails.likeCount}</span></div>
  )
}

export default LikeComponent