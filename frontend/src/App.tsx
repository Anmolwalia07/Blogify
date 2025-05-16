import { BrowserRouter, Route, Routes } from "react-router"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import ProtectedWrapper from "./protected/ProtectedWrapper"
import Blogs from "./component/Blogs"
import FollowingBlogs from "./component/FollowingBlogs"
import Post from "./pages/Post"
import ScrollToTop  from "./component/ScrollToTop"
import DrafedBlogs from "./pages/DrafedBlogs"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Profile from "./pages/Profile"

export  type item={
  id :number,     
  title  : String,
  content  :String,
  published  :Boolean,        
  authorId   :number,
  likeCount  :number,            
  savedCount :number,            
  createdAt  :string,     
  updatedAt  :string,
  author:Author,
  savedBy:SavedBy[],
  likedBy:LikedBy[]    
  }

  type SavedBy={
    postId:number,
    userId:number
  }
   type LikedBy={
    postId:number,
    userId:number
  }

  type Author={
    id:number,
    name:string,
    email:string,
    bio:string,
    picture:string
    likedPosts:LikedPosts[],
    savedPosts:SavedPosts[]
  }

  export type LikedPosts={
    userId:number,
    postId:number
  }
  export type SavedPosts={
    userId:number,
    postId:number,
  }

function App() {
  const queryClient=new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<ProtectedWrapper><Home/></ProtectedWrapper>}>
        <Route path="/" element={<ProtectedWrapper><Blogs/></ProtectedWrapper>}/>
        <Route path="/following" element={<FollowingBlogs/>}/>
      </Route>
      
        <Route path="/post" element={<ProtectedWrapper> <ScrollToTop/><Post/></ProtectedWrapper>}/>
        <Route path="/blog/drafted" element={<ProtectedWrapper> <ScrollToTop/><DrafedBlogs/></ProtectedWrapper>}/>

        <Route path="/profile" element={<ProtectedWrapper><Profile/></ProtectedWrapper>}/>
    </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
