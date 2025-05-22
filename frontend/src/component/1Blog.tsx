import { MdDeleteOutline } from "react-icons/md"
import { colorMap, type item } from "../App"
import LikeComponent from "./LikeComponent"
import SavedBlog from "./SavedBlog"
import { FiEdit } from "react-icons/fi"
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router"
import FeedbackMessage from "./FeedbackMessage"
import DeleteBlogModal from "./DeleteModal"
import Loader from "./Loader"
import axios from "axios"
import { API_url } from "../url"
import noblogs from "../assets/no blog.jpg"

type Children={blog:any,hasMore:boolean,ref:any ,isProfilePost:boolean}

function Blog1({blog ,hasMore ,ref ,isProfilePost}:Children) {
    const context=useContext(UserContext);
    const navigation=useNavigate();
    const [loading, setLoading] = useState(false)
    const [feedback,setFeedback]=useState<{type:"success" | "error",message :string} | null>(null)
    const [isModalOpen, setModalOpen] = useState(false);
    const [id,setId]=useState(0)

    const handleDelete=async(id:number)=>{
    const token=localStorage.getItem("token");
    setModalOpen(false)
    try{
      setLoading(true)
      const response=await axios.delete(`${API_url}/blog/delete/${id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      if(response.data){
        setLoading(false);
        setFeedback({type:"success",message:response?.data.message});
        navigation("/profile", { state: { refresh: Date.now() } });
      }
    }catch(e){
    console.log(e)
      setLoading(false)
      //@ts-ignore
      setFeedback({type:"error",message:e.response.data.message})
    }
  }

    return (
    <>
    {loading && <Loader/>}
      {isModalOpen && <DeleteBlogModal
        onClose={() => setModalOpen(false)}
        handleDelete={()=>{
            handleDelete(id)
        }}
      />}
      {feedback?.message && <FeedbackMessage type={feedback.type} message={feedback.message} onClose={()=>{setFeedback(null)}}/>}

    {blog?.length >=1 ? <div className="px-6 mt-3 sm:px-20 sm:mt-6 md:px-[120px] md:mt-7 lg:px-[220px] lg:mt-7 mb-25 ">
      {blog?.map((item:item)=>{
        return(
        <div className="border-b mt-2 relative" key={item.id}>
        <div className="flex items-end gap-1 mb-1 w-full">
        <div className="flex items-end gap-1 w-fit hover:cursor-pointer" onClick={()=>{
            if(item.authorId===context?.user.id){
                navigation("/profile")
            }else{
                navigation(`/profile/${item.authorId}`);
            }

        }}>
        <div className={`w-7 h-7 rounded-full ${colorMap[item.author.picture]} flex justify-center text-white items-center pb-0.5`}>{item.author?.name.charAt(0)}</div>
        <h1 className="text-md font-semibold md:text-lg md:ml-1" 
        >{item.author?.name}</h1>
        </div>
        <h2 className="flex text-xs pb-1 ml-2 sm:text-sm">{item.updatedAt?.split("T")[0]}</h2>
        {(isProfilePost && item.authorId===context?.user.id) && <div className="flex gap-2 items-center w-fit absolute right-5 top-2">
              <MdDeleteOutline 
              onClick={()=>{
                setModalOpen(true);
                setId(item.id)
              }}
              className="text-xl font-bold md:text-2xl mt-[0.5px] hover:cursor-pointer"/>
              <FiEdit onClick={()=>{
                navigation(`/editblog/${item.id}`);
              }} className="text-lg font-bold md:text-xl hover:cursor-pointer"/>
            </div>}
        </div>
        <div onClick={()=>{
          navigation(`/blog/${item.id}`)
        }}>
          <h1  className="font-semibold text-xl md:text-2xl overflow-hidden mt-1 pl-1">{item.title}</h1>
        <p className=" text-md md:text-lg text-wrap mt-1 pl-1 max-h-21 md:max-h-25 overflow-y-hidden">{item.content}</p>
          </div>
        {/* like count */}

        <div className="flex justify-between items-center mt-1">
          <LikeComponent id={item.id}/>
        {/* Saved */}

        <SavedBlog item={item}/>
        </div>
      </div>
        )
      })}
      {hasMore && <div ref={ref} className="flex justify-center mt-3">
        <div className="w-12 h-12 border-4 border-black border-dashed border-t-transparent rounded-full animate-spin"></div>
      </div>}
    </div> : <div className=" sm:px-20 sm:mt-6 md:px-[120px] md:mt-7 lg:px-[200px] lg:mt-7 mb-25 text-xl font-semibold">
            <div className="w-full h-35  flex justify-center flex-col items-center">
            <div className=" h-full w-30" style={{ backgroundImage: `url("${noblogs}")`, backgroundSize: 'contain', backgroundPosition: 'center' }}></div>
            </div>
      </div>}
    </>
  )
}

export default Blog1