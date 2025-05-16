import { Link, useLocation } from "react-router";
import { AiFillHome } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";


function BottomBar() {
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Home", icon: <AiFillHome size={24} /> },
    { to: "/post", label: "Post", icon: <IoIosCreate size={24} /> },
    { to: "/profile" , label: "Profile", icon: <FaUserCircle size={24} /> },
  ];

  return (
    <div className="fixed bottom-0 w-full z-50 bg-white shadow-inner lg:hidden flex justify-around py-2">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`flex flex-col items-center text-sm ${
            location.pathname === item.to ||( location.pathname=="/following" && item.label=="Home") || ( location.pathname=="/profile/liked" && item.label=="Profile") || ( location.pathname=="/profile/saved" && item.label=="Profile") || ( location.pathname=="/profile/mypost" && item.label=="Profile") ? "text-black font-semibold mt-[-5px] " : "text-gray-500"
          }`}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
}

export default BottomBar;
