import { NavLink, useNavigate } from "react-router";
import { FiAlignJustify } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import {  useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";



function Header() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  



  return (
    <div className="fixed w-full top-0 z-50 h-fit">
      <div className="shadow py-3 px-5 flex justify-between items-center bg-white">
        <div className="text-2xl font-extrabold md:pl-8 pl-4 md:text-3xl">Blogify</div>
        <div className="hidden lg:flex justify-center items-center gap-12">
        <NavLink to={"/"} className={`text-2xl`}>Home</NavLink>
        <NavLink to={"/post"} className={`text-2xl`}>Post</NavLink>
        <NavLink to={"/profile"} className={`text-3xl`}><FaUserCircle/></NavLink>
        <button
          className="border-2 rounded-xl px-4 text-lg py-1 hover:bg-gray-100 mr-10"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </button>
        </div>
        <div className="flex items-center mt-1.5 gap-5 text-2xl lg:hidden mr-5 cursor-pointer">
          <IoSearch className="sm:hidden" onClick={()=>{
           navigate('/search')
          }}/>
          {!visible ? (
          <FiAlignJustify
            onClick={() => setVisible(true)}
          />
        ) : (
          <RxCross2
            onClick={() => setVisible(false)}
          />
        )}

        </div>
      </div>

      {visible && (
        <div
          className="flex lg:hidden fixed w-full top-14 font-semibold justify-center px-4 text-lg py-2 bg-gray-300 cursor-pointer"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </div>
      )}
    </div>
  );
}

export default Header;
