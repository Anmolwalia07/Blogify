import { NavLink, Outlet } from "react-router"
import BottomBar from "../component/BottomBar"
import Header from "../component/Header"
import Hero from "../component/Main"


function Home() {
  return (
    <>
    <Header/>
    <Hero/>
    <div className=" px-8 mt-3 sm:px-20 sm:mt-6 md:px-[120px] md:mt-7 lg:px-[200px] lg:mt-9">
      <div className="flex border-b-1 text-lg gap-4">
        <NavLink to={`/`} className="ml-2">For you</NavLink>
        <NavLink to={`/following`}>Following</NavLink>
      </div>
    </div>
    <Outlet/>
    <BottomBar/>
    </>
  )
}

export default Home