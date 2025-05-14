import { BrowserRouter, Route, Routes } from "react-router"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import ProtectedWrapper from "./protected/ProtectedWrapper"
import Blogs from "./component/Blogs"
import FollowingBlogs from "./component/FollowingBlogs"
import Post from "./pages/Post"
import ScrollToTop  from "./component/ScrollToTop"
function App() {

  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<ProtectedWrapper><Home/></ProtectedWrapper>}>
        <Route path="/" element={<Blogs/>}/>
        <Route path="/following" element={<FollowingBlogs/>}/>
      </Route>
      <Route path="/post" element={<ProtectedWrapper><Post/></ProtectedWrapper>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
