import axios from "axios";
import { useContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { API_url } from "../url";
import { UserContext } from "../context/UserContext";
import Loader from "../component/Loader";

interface Dashboard {
  children: ReactNode;
}

function ProfileWrapper({ children }: Dashboard) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const context = useContext(UserContext);
  const [loading, setLoading] = useState(true); // 🟡 Add loading state

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    axios
      .get(`${API_url}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data?.user) {
        console.log(res.data.user);
          context?.setUser(res.data.user);
        } else {
          navigate("/login");
          localStorage.removeItem("token")
        }
      })
      .catch((e) => {
        console.error(e);
        localStorage.removeItem("token")
        navigate("/login");
      });
      setLoading(false)
  }, [token,navigate]);

  if (loading) return <Loader/>;

  return <>{children}</>;
}

export default ProfileWrapper;
