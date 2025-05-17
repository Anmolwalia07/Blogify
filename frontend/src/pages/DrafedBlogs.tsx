import axios from "axios";
import { useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router";
import { API_url } from "../url";
import { FiEdit } from "react-icons/fi";
import Loader from "../component/Loader";
import { MdDeleteOutline } from "react-icons/md";
import DeleteBlogModal from "../component/DeleteModal";
import FeedbackMessage from "../component/FeedbackMessage";
import noblog from '../assets/no blog.jpg'
import type { item } from "../App";



function DrafedBlogs() {
  const [data, setData] = useState([])
  const navigation=useNavigate();
  const [loading, setLoading] = useState(false)
  const [feedback,setFeedback]=useState<{type:"success" | "error",message :string} | null>(null)
  const [isModalOpen, setModalOpen] = useState(false);
  const [id,setId]=useState(0);
  const token=localStorage.getItem("token")
  useEffect(()=>{
    setLoading(true)
    axios.get(`${API_url}/blog/drafted`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((res)=>{
      if(res.data){
        setData(res.data.posts)
        setLoading(false)
      }
    }).catch(err=>{
      setLoading(false)
      console.log(err);
    })
  },[id])
  

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
        setId(-1)
      }
    }catch(e){
      setLoading(false)
      setId(-1)
      //@ts-ignore
      setFeedback({type:"error",message:e.response.data.message})
    }
  }

  const publishDraftedPost=(postId:number)=>{
    setLoading(true)
    axios.put(`${API_url}/blog/drafted-to-publish`,{id:postId},{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((res)=>{
      setLoading(false)
      setFeedback({type:"success",message:res?.data.message});
      setId(-1)
    }).catch((e)=>{
      setLoading(false)
      //@ts-ignore
      setFeedback({type:"error",message:e.response.data.message})
      setId(-1)
    })
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

      <div className="flex  items-center py-4 shadow-md text-xl font-bold px-4 ">
      <IoArrowBackSharp 
      onClick={()=>{
        navigation(-1)
      }}
      className="text-2xl z-5"/>
      <div className="w-full flex justify-center ml-[-20px]"><h1>Drafted</h1></div>
      </div>
      <div className=" px-8 mt-4 sm:px-20 sm:mt-6 md:px-[120px] md:mt-7 lg:px-[200px] lg:mt-7 mb-20">
        <div className="text-xl font-bold flex justify-end px-4 md:text-2xl">{data?.length>=1 && `(${data?.length})`}</div>
        {data?.length >=1 ? data?.map((item:item)=>{
          return (
            <div className="border-b mt-3" key={item.id}>
            <h1 className="font-semibold text-xl md:text-2xl lg:text-3xl capitalize">{item.title}</h1>
            <p className="md:text-xl text-lg lg:text-xl">{item.content}</p>
            <div className="w-full flex items-center justify-between pr-2 mt-2 lg:pr-3 mb-1 ">
              <button className="outline-none bg-green-400 px-2 rounded-lg text-white hover:cursor-pointer"
              onClick={()=>{
                publishDraftedPost(item.id);
              }}
              >Publish</button>
              <div className="flex gap-3 items-center">
              <MdDeleteOutline 
              onClick={()=>{
                setModalOpen(true)
                setId(item.id)
              }}
              className="text-xl font-bold md:text-2xl mt-[0.5px] hover:cursor-pointer"/>
              <FiEdit className="text-lg font-bold md:text-xl hover:cursor-pointer"/>
              </div>
            </div>
            </div>
          )
        }):<div className="flex text-lg font-semibold lg:mt-2  flex-col w-full">
            <h1>No Drafted Blog....</h1>
            <div className="w-full h-100  p-2 mt-5  flex justify-center flex-col items-center">
            <div className=" h-full w-80" style={{ backgroundImage: `url("${noblog}")`, backgroundSize: 'contain', backgroundPosition: 'center' }}></div>
            <div className="bg-yellow-500 text-white p-1 px-2 rounded-lg hover:cursor-pointer hover:bg-yellow-600 hover:scale-105 duration-200 w-fit"
            onClick={()=>{
              navigation("/post")
            }}
            >Create Blog</div>
            </div>
          </div>}
      </div>
    </>
  )
}

export default DrafedBlogs