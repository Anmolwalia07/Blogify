import axios from "axios";
import { API_url } from "../url";
import Blog1 from "./1Blog";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Loader from "./Loader";

function MyLikedPost() {
  const PageSize = 4;
  const [blog, setBlog] = useState<any[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true); // ✅ prevent double fetch
  const { ref, inView } = useInView();

  const isFirstLoad = useRef(true); // Prevent running fetch twice on mount

  const fetchPosts = async (reset = false) => {
    const token = localStorage.getItem("token");

    try {
      const currentSkip = reset ? 0 : skip;
      const res = await axios.get(`${API_url}/blog/likedPost?skip=${currentSkip}&take=${PageSize}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const newPosts = res.data.blogs || [];
      setHasMore(newPosts.length === PageSize);
      setBlog(prev => (reset ? newPosts : [...prev, ...newPosts]));
      setSkip(currentSkip + PageSize);
    } catch (e) {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

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
        <Blog1 blog={blog} hasMore={hasMore} ref={ref} isProfilePost={false} />
    </>
  );
}

export default MyLikedPost;
