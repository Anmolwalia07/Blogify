import { useContext, useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5"
import { useNavigate, useParams } from "react-router"
import FeedbackMessage from "../component/FeedbackMessage";
import Loader from "../component/Loader";
import { API_url } from "../url";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { colorMap } from "../App";
import LikeComponent from "../component/LikeComponent";

function IndivdualBlog() {


  const [loading, setLoading] = useState(true);
  const [fromData, setFormData] = useState({id:0,title:'',content:'',author:{name:'',picture:'',updatedAt:''},})
  const [feedback, setFeedback] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const context = useContext(UserContext);
  const navigate= useNavigate();
  const { id } = useParams();
  const postId = Number(id);
  const token = localStorage.getItem("token");


  useEffect(() => {
    if (!postId || !context?.user?.id) {
      navigate("/");
      return;
    }
    axios
      .get(`${API_url}/blog/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const blog = res.data?.blog;
        if(blog){
          setFormData(blog)
        }
      })
      .catch((err) => {
        console.error(err);
        navigate(-1);
      })
      .finally(() => setLoading(false));
  }, [postId, context?.user?.id]);

  if (loading) return <Loader />;

  return (
    <>
    {feedback?.message && <FeedbackMessage type={feedback.type} message={feedback.message} onClose={()=>setFeedback(null)}/>}
    <div className="flex items-center py-4 shadow-md text-xl font-bold px-5  overflow-hidden ">
                  <IoArrowBackSharp
                  onClick={()=>{
                    navigate(-1)
                  }}
                  className="text-2xl z-5"/>
            <div className="w-full flex justify-center tracking-wider ml-[-25px]"><h1>{fromData?.author.name}</h1></div>
    </div>

    <div className="flex flex-col items-center  w-full  ">
    <div className="h-auto md:w-[70%] xl:w-[50%] flex justify-center flex-col mt-5 w-full  gap-1 px-8 ">
              <label className="text-md font-medium mt-2 capitalize">Title</label>
              <h1  
              className=" py-2 px-3  border-gray-600 outline-none border-r-2 border-l-2">{fromData?.title}</h1>
              <label className="text-md font-medium mt-4 capitalize">Content</label>
              <h1 className=" py-2 px-4  border-gray-600 border-l-2 border-r-2">{fromData?.content}</h1>
              <div className="mt-2"><LikeComponent id={fromData.id}/></div>
              <label className="text-md font-medium  capitalize mt-15">Author</label>
              <div className="border-gray-300 border-2 px-4 w-fit  py-2 rounded-lg flex flex-col text-xl">
                <div className="flex items-end gap-1">
                    <h1 className={`w-8 h-8 ${colorMap[fromData?.author.picture || 0] } rounded-full flex justify-center items-center text-white font-semibold`}>{fromData?.author.name.charAt(0)}</h1>
                <h1 className="">{fromData?.author.name}</h1>
                </div>
                <div className="text-sm font-semibold ml-1">{fromData?.author.updatedAt.split("T")[0]}</div>
              </div>
    </div>
    </div>
    
    </>
  )
}

export default IndivdualBlog