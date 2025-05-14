import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";



function Blogs() {
  const [likeCount, setLikeCount] = useState(20);
  const [isLiked,setIsLiked]=useState(false);
  const [isSaved, setIsSaved] = useState(false);
  return (
    <div className=" px-8 mt-4 sm:px-20 sm:mt-6 md:px-[120px] md:mt-7 lg:px-[200px] lg:mt-7 mb-25">
      <div className="border-b mt-2">
        <h1 className="text-lg font-semibold md:text-xl">Anmol walia</h1>
        <h1 className="font-semibold text-xl md:text-2xl">Title</h1>
        <p className="md:text-xl text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam atque optio saepe inventore at dolorem nostrum! Adipisci iure voluptas nobis corporis ea</p>
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

export default Blogs