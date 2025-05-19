import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { API_url } from "../url";
import Loader from "../component/Loader";
import { IoArrowBackSharp } from "react-icons/io5";
import FeedbackMessage from "../component/FeedbackMessage";

function EditPage() {
  const [loading, setLoading] = useState(true);
  const [formData,setFormData]=useState({id:'',title:'',content:''})
  const [feedback, setFeedback] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [isLoading,setIsLoading]=useState(false)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const textareaRef1 = useRef<HTMLTextAreaElement | null>(null);


  const context = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const postId = Number(id);
  const token = localStorage.getItem("token");

  const handleInput = () => {
      const textarea = textareaRef.current ;
      if (textarea) {
        textarea.style.height = "auto"; // reset the height
        textarea.style.height = textarea.scrollHeight + "px"; // set to content height
      }
    };

     const handleInput2 = () => {
      const textarea = textareaRef1.current ;
      if (textarea) {
        textarea.style.height = "auto"; // reset the height
        textarea.style.height = textarea.scrollHeight + "px"; // set to content height
      }
    };

const handleSubmit=(e:any)=>{
    const token=localStorage.getItem("token")
    e.preventDefault();
    setIsLoading(true);
    axios.put(`${API_url}/blog/blogedit/${postId}`,formData,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }).then((res)=>{
      setFeedback({type:"success",message:res.data.message});
      setIsLoading(false);
    }).catch(e=>{
      setIsLoading(false);
            //@ts-ignore
      setFeedback({type:"error",message:e});
    })
  }

  useEffect(() => {
    if (!postId || !context?.user?.id) {
      navigate("/");
      return;
    }
    axios
      .get(`${API_url}/blog/blogedit/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const blog = res.data?.blog;
        if (!blog || blog.authorId !== context.user.id) {
          navigate("/");
        }else{
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
    {isLoading && <Loader/>}
    {feedback?.message && <FeedbackMessage type={feedback.type} message={feedback.message} onClose={()=>setFeedback(null)}/>}
    <div className="flex items-center py-4 shadow-md text-xl font-bold px-5  overflow-hidden ">
                  <IoArrowBackSharp
                  onClick={()=>{
                    navigate(-1)
                  }}
                  className="text-2xl z-5"/>
            <div className="w-full flex justify-center tracking-wider ml-[-25px]"><h1>EditBlog</h1></div>
    </div>
    <div className="flex flex-col items-center  w-full  ">
    <div className="h-auto w-full md:w-[70%] xl:w-[50%] flex justify-center ">
        <form onSubmit={handleSubmit} className="flex flex-col mt-5 w-full  gap-1 px-8" >
              <label className="uppercase text-md font-medium mt-2">Title</label>
              <textarea  
              ref={textareaRef1}
              onInput={handleInput2}
              minLength={3}
              value={formData.title}
              onChange={(e)=>{
                setFormData({...formData,title:e.target.value})
              }}
              maxLength={200}
              rows={1}
              className=" py-2 px-3 rounded-xl bg-[#c5c3c3a0] border-gray-600 outline-none max-h-35"></textarea>
              <label className="uppercase text-md font-medium mt-2">Content</label>
              <textarea 
               ref={textareaRef}
              onInput={handleInput}
              onChange={(e)=>{
                setFormData({...formData,content:e.target.value})
              }}
              minLength={10}
              rows={1}
              value={formData.content} placeholder="Content" className=" py-2 px-4 rounded-xl bg-[#c5c3c3a0] border-gray-600 max-h-55 min-h-25 "></textarea>
              <button type="submit" className="cursor-pointer bg-black p-3 text-white font-semibold rounded-xl mt-15">Save Changes</button> 
            </form> 
    </div>
    </div>
    </>
  );
}

export default EditPage;
