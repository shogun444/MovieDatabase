import { Link, useLocation, useNavigate } from "react-router-dom"
import Searchbar from "./Navbar/Searchbar"
import { useState, useEffect } from "react"

import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "../utils/axios";
import Loading from "./Details/loading";

export default function Movies(){
      const [loading,setLoading] = useState(false)
      const [movies, setMovies] = useState([]);
      const [moviehasMore,setMovieHasMore] = useState(true)
      const [pages, setPages] = useState(1);
    


const navigate = useNavigate()
  function back(){
    navigate(-1)

  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/movie/top_rated?page=${pages}`);
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
        setMovieHasMore(response.data.total_pages > pages); // Update the hasMore flag
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMovies();
  }, [pages]); // Trigger fetching data when `pages` changes
  




  return(<>
  <div className="w-full bg-[#1e1d1d] fixed top-0 left-0 z-10 flex justify-between  items-center p-4">
      <span onClick={back} className="p-2 hover:cursor-pointer hover:text-white  h-fit rounded-md ml-10 text-3xl font-semibold text-indigo-600"><i className="ri-arrow-left-line"></i></span>
   <h1 className="p-2 w-fit text-2xl font-semibold  rounded-md text-[#dadada7b]">Movies</h1>
      <Searchbar/>
      
    </div>

<InfiniteScroll
dataLength= {movies.length}
next={()=>setPages(prev=>prev+1)}
hasMore={moviehasMore}
loader={<Loading/>} 
  

>
<div className="mx-auto bg-[#1f1e1e] justify-center pt-25 flex gap-10 space-y-2 flex-wrap">

{movies.map((itm, index) => (
  <Link to={`/movie/details/${itm.id}`}
    key={index}
    className="relative w-[15vw] shadow-2xl rounded-lg transition-all overflow-hidden group"  // Added 'group' to the outer div for hover effect
  >
    {/* Image */}
    <img
      className=" cursor-pointer hover:opacity-30 transition-opacity group-hover:opacity-30"  // Added transition-opacity for smooth hover effect
      src={`https://image.tmdb.org/t/p/w500/${itm.poster_path}`}
      alt=""
    />
    
    {/* Title on top of the image */}
    <div className="absolute top-23 left-0 right-0 text-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
      <h1 className="text-white font-semibold text-xl truncate">
        {itm.original_name || itm.title}
      </h1>
    </div>
  </Link>
))}

</div>
</InfiniteScroll>

  
  </>)
}