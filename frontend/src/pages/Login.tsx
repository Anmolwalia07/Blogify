import { Link } from "react-router"
import Logo from "../component/Logo"
import { useState } from "react"
import axios from "axios";
import { API_url } from "../url";
import { useNavigate } from "react-router";
import Loader from "../component/Loader";
import FeedbackMessage from "../component/FeedbackMessage";


function Login() {
    const [formData, setFormData] = useState({
        email:'',
        password:''
      })

    const [feedback,setFeedback]=useState<{type:"success" | "error",message :string} | null>(null)

    const [loading, setLoading] = useState(false)
    const navigate=useNavigate();
    async function handleSubmit(e:any){
        e.preventDefault();
        try{
            setLoading(true)
            const response=await axios.post(`${API_url}/login`,formData);
            if(response.data){
                localStorage.setItem("token",response.data.jwt);
                setFeedback({type:"success",message:response.data.message})
                setLoading(false)
                navigate("/")
            }
        }catch(e){
            setLoading(false)
            //@ts-ignore
            setFeedback({type:"error",message:e.response.data.message})
        }

    }
    
  return (
    <>
    <Logo/>
    {loading && <Loader/>}
    {feedback?.message && <FeedbackMessage type={feedback.type} message={feedback.message} onClose={()=>{setFeedback(null)}}/>}
    <div className="w-full h-screen flex justify-center items-center px-5 md:px-8 py-10  lg:py-0 lg:px-0">
        <div className="lg:w-[72rem] md:h-[45%] xl:h-2/3  w-full h-2/3 flex border">
        <div className="md:w-1/2 h-full flex flex-col items-center w-full justify-center bg-[#ffffff]">
        <h1 className="text-3xl font-bold ">Login an account</h1>
        <h1>If don't have an account ? <Link to={`/signup`} className="text-blue-700 underline">signup</Link></h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-1 w-full px-10 mt-12">
            <label  className="font-semibold">Email</label>
            <input
             onChange={(e)=>{
              setFormData({...formData,email:e.target.value})
            }}  type="email" className="border rounded p-2 px-4 outline-none" placeholder="example@gmail.com" required></input>
            <label  className="font-semibold">Password</label>
            <input 
            onChange={(e)=>{
              setFormData({...formData,password:e.target.value})
            }} type="password" className="border rounded p-2 px-4 outline-none" placeholder="example@gmail.com" required></input>
            <button type="submit" className="bg-black mt-4 p-1.5 text-white font-semibold text-lg rounded hover:cursor-pointer">Login</button>
        </form>
        </div>
        <div className="bg-[#e1e4e7d9] hidden  md:w-1/2 md:h-full  md:flex flex-col px-6 pl-12 justify-center" >
        <p className="text-2xl font-bold w-full mt-4">
            "The customer service I recieved was expectional. The support team went above and beyoud to address my concerns."
        </p>
        <h2 className="text-xl font-semibold mt-1">Anmol Walia</h2>
        <h3>CEO</h3>
        </div>
        </div>
    </div>
    </>
  )
}

export default Login