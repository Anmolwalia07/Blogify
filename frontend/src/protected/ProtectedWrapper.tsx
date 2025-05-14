import axios from "axios";
import { useContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { API_url } from "../url";
import { UserContext } from "../context/UserContext";
import Loader from "../component/Loader";

interface Dashboard {
  children: ReactNode;
}

function ProtectedWrapper({ children }: Dashboard) {
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
          context?.setUser(res.data.user); // Optional chaining
          setLoading(false);
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
  }, [token]);

  // 🛑 Show nothing or a loader while verifying
  if (loading) return <Loader/>;

  return <>{children}</>;
}

export default ProtectedWrapper;
