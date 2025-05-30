import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
function FollowingBlogs() {
    //@ts-ignore
    const [likeCount, setLikeCount] = useState(20);
  const [isLiked,setIsLiked]=useState(false);
  const [isSaved, setIsSaved] = useState(false);
  return (
<div className=" px-8 mt-3 sm:px-20 sm:mt-6 md:px-[120px] md:mt-7 lg:px-[200px] lg:mt-7">
      <div className="border-b mt-2">
         <div className="flex gap-1 items-end"><div className={`w-7 h-7 rounded-full bg-red-300 flex justify-center text-white items-center pb-0.5`}>x</div>
                <h1 className="text-md font-semibold md:text-lg md:ml-1" 
                >Unknown</h1></div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam atque optio saepe inventore at dolorem nostrum! Adipisci iure voluptas nobis corporis ea</p>
         {/* like count */}
        
                <div className="flex justify-between items-center mt-1">
                <div className="flex gap-1 items-center mb-2 mt-1">
                {isLiked ? <FaHeart className={`text-xl  text-red-500 duration-200 md:text-2xl`} onClick={()=>{
                  setIsLiked(prev=>!prev);
                }}/>:<CiHeart className="text-xl duration-200 md:text-2xl" onClick={()=>{
                  setIsLiked(prev=>!prev);
                }}/>}<span>{isLiked ? likeCount+1 : likeCount}</span></div>
        
                {/* Saved */}
        
                <div>
                  {isSaved ? 
                  <FaBookmark className="text-xl mr-5 md:text-2xl" onClick={()=>{
                    setIsSaved(!isSaved);
                  }}/>
                  :<CiBookmark className="text-xl mr-5 md:text-2xl" onClick={()=>{
                    setIsSaved(!isSaved);
                  }}/>}
                </div>
                </div>
        
      </div>
    </div> 
     )
}

export default FollowingBlogs