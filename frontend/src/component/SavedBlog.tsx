import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import axios from "axios";
import { API_url } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import type { item } from "../App";

function SavedBlog({ item }: { item: item }) {
    const [havePostId, setHavePostId] = useState(0);
    const [BlogDetails,setBlogDetails] =useState({savedBy:[{userId:0,postId:0}]})
    const context=useContext(UserContext)

     const saveBlog=(postId:number)=>{
        const token=localStorage.getItem("token");
        axios.post(`${API_url}/user/saveblog`,{postId},{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }).then(()=>{
            setHavePostId(item.id);
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
        }).then(()=>{
            setHavePostId(-1);
        }).catch(e=>{
          console.log(e)
        })
        
      }

      useEffect(()=>{
        console.log("use effect")
        const token=localStorage.getItem("token")
        axios.get(`${API_url}/blog/${item.id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(res=>{
            setBlogDetails(res.data.blog);
        }).catch(e=>{
            console.log(e)
        })

      },[havePostId])

  return (
        <div
            className="w-fit hover:cursor-pointer"
            key={item.id}
              onClick={() => {
                if(item?.savedBy?.some(x => x.postId === item.id && x.userId===context?.user.id) || havePostId===item.id){
                console.log("unsaved");
                unSaveblog(item.id);
                }else{
                console.log("Saved")
                saveBlog(item.id);
                }
                }}
            >
              {(BlogDetails?.savedBy?.some(x => x.postId === item.id && x.userId===context?.user.id) || havePostId===item.id )? (
                <FaBookmark className="text-xl mr-5 md:text-2xl z-10 relative" />
              ) : (
                <CiBookmark className="text-xl mr-5 md:text-2xl" />
              )}
        </div>
  )
}

export default SavedBlog