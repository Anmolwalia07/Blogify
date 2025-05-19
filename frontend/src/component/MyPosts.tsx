import axios from "axios";
import { API_url } from "../url";
import Blog1 from "./1Blog";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useLocation } from "react-router"; // ✅ Fix: react-router-dom
import Loader from "./Loader";

function MyPosts() {
  const PageSize = 4;
  const [blog, setBlog] = useState<any[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false); // ✅ prevent double fetch
  const { ref, inView } = useInView();
  const location = useLocation();

  const isFirstLoad = useRef(true); // Prevent running fetch twice on mount

  const fetchPosts = async (reset = false) => {
    if (loading) return;

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const currentSkip = reset ? 0 : skip;
      const res = await axios.get(`${API_url}/blog/myblogs?skip=${currentSkip}&take=${PageSize}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const newPosts = res.data.posts || [];

      setHasMore(newPosts.length === PageSize);
      setBlog(prev => (reset ? newPosts : [...prev, ...newPosts]));
      setSkip(currentSkip + PageSize);
    } catch (e) {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch if navigation triggered a refresh
  useEffect(() => {
    if (location.state?.refresh) {
      setBlog([]);
      setSkip(0);
      setHasMore(true);
      fetchPosts(true);
    }
  }, [location.state]);

  // Initial fetch on first mount
  useEffect(() => {
    if (isFirstLoad.current) {
      fetchPosts();
      isFirstLoad.current = false;
    }
  }, []);

  // Infinite scroll fetch
  useEffect(() => {
    if (inView && hasMore && !loading) {
      fetchPosts();
    }
  }, [inView]);

  return (
    <>
    {loading && <Loader/>}
        <Blog1 blog={blog} hasMore={hasMore} ref={ref} isProfilePost={true} />
    </>
  );
}

export default MyPosts;
