
function Hero() {
  return (
    <>
    <div className="flex flex-col items-center justify-center bg-white text-center px-8 md:px-6 mt-21 ">
      <h1 className="text-3xl font-bold md:text-6xl mt-4 md:mt-8  md:px-5 xl:text-7xl lg:font-extrabold">
      Welcome To Blogify </h1>
      <p className="text-lg md:text-2xl text-gray-600 max-w-2xl px-8 md:mt-3 mt-1 tracking-wide">
       The easiest way to share your thoughts, stories, and experiences with the world...
      </p>
      <div className="px-5 w-full sm:w-[35rem] md:w-[35rem] p-2 mt-3 flex flex-col sm:flex-row md:items-center gap-1">
      <input type="text" placeholder="Search for blogs,peoples,etc.." className="border-2 rounded-lg w-full p-1.5 outline-0 pl-3"></input>
      <button className="w-fit mt-2 sm:mt-0 bg-black text-white text-lg px-4 p-1.5 rounded-xl ml-1">Search</button>
      </div>
    </div>
    </>
  );
}

export default Hero;
 