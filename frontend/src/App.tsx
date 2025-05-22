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
import Profile from "./pages/Profile"
import MyPosts from "./component/MyPosts"
import EditProfile from "./pages/EditProfile"
import OtherProfile from "./pages/OtherProfile"
import SettingPage from "./pages/SettingPage"
import IndivdualBlog from "./pages/IndivdualBlog"
import SearchPage from "./pages/SearchPage"
import EditBlogPage from "./pages/EditPage"
import UpdatePassword from "./pages/UpdatePassword"
import YourActivities from "./pages/YourActivities"
import MyLikedPosts from "./component/MyLikedPosts"
import MySavedPosts from "./component/MySavedPosts"
import PersonalDetails from "./pages/PersonalDetails"

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

  export  type Author={
    id:number,
    name:string,
    email:string,
    bio:string,
    picture:string
    likedPosts:LikedPosts[],
    savedPosts:SavedPosts[],
    updatedAt:string
  }

  export type LikedPosts={
    userId:number,
    postId:number
  }
  export type SavedPosts={
    userId:number,
    postId:number,
  }

  export const colorMap: Record<string, string> = {
  blue: 'bg-blue-500',
  yellow: 'bg-yellow-500',
  red: 'bg-red-500',
  green: 'bg-green-500',
  orange:'bg-orange-500',
  pink  : 'bg-pink-500'
  // add more as needed
};
function App() {
  return (
    <BrowserRouter>
    <Routes >
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<ProtectedWrapper><Home/></ProtectedWrapper>}>
        <Route path="/" element={<ProtectedWrapper><Blogs/></ProtectedWrapper>}/>
        <Route path="/following" element={<FollowingBlogs/>}/>
      </Route>
        <Route path="/post" element={<ProtectedWrapper> <ScrollToTop/><Post/></ProtectedWrapper>}/>
        <Route path="/blog/drafted" element={<ProtectedWrapper> <ScrollToTop/><DrafedBlogs/></ProtectedWrapper>}/>

      <Route path="/profile"  element={<ProtectedWrapper><Profile /></ProtectedWrapper>}>
        <Route index path="/profile" element={<MyPosts />} />
      </Route>
      <Route path='/editProfile' element={<ProtectedWrapper><EditProfile/></ProtectedWrapper>}/>
      <Route path="/profile/:id" element={<ProtectedWrapper><OtherProfile/></ProtectedWrapper>}/>
      <Route path="/setting" element={<ProtectedWrapper><SettingPage/></ProtectedWrapper>}/>

      <Route path="/blog/:id" element={<ProtectedWrapper><IndivdualBlog/></ProtectedWrapper>}/>  
      <Route path="/search" element={<ProtectedWrapper><SearchPage/></ProtectedWrapper>}/>
      <Route path="/editblog/:id" element={<ProtectedWrapper><EditBlogPage/></ProtectedWrapper>}/>

      <Route path="/passwordAndSecurity" element={<ProtectedWrapper><UpdatePassword/></ProtectedWrapper>}/>
      <Route path="/activity" element={<ProtectedWrapper><YourActivities/></ProtectedWrapper>}>
      <Route index path="/activity" element={<MyLikedPosts />} />
        <Route path="/activity/saved" element={<MySavedPosts />} />
      </Route>
      <Route path="/personalDetails" element={<ProtectedWrapper><PersonalDetails/></ProtectedWrapper>}/>
    </Routes>

    </BrowserRouter>
  )
}

export default App
