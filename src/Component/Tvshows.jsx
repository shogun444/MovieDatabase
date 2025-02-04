import { Link, useLocation, useNavigate } from "react-router-dom"
import Searchbar from "./Navbar/Searchbar"
import {  useEffect, useState} from "react"

import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "../utils/axios";
import Loading from "./Details/loading";


export default function Tvshows(){
const [loading,setLoading] = useState(false)
const [tv, setTv] = useState([]);
const [tvhasMore,setTvHasMore] = useState(true)
const [tpage, setTpage] = useState(1);

const navigate = useNavigate()
  function back(){
    navigate(-1)

  }

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/tv/top_rated?page=${tpage}`);
        setTv((prevTv) => [...prevTv, ...response.data.results]);
        setTvHasMore(response.data.total_pages > tpage); // Update the hasMore flag
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTvShows();
  }, [tpage]); // Trigger fetching data when `tpage` changes
  




  return(<>
  <div className="w-full bg-[#1e1d1d] flex justify-center fixed top-0 left-0 z-10 items-center p-2">
      <span onClick={back} className="p-2 hover:cursor-pointer hover:text-white  h-fit rounded-md ml-10 text-3xl font-semibold text-indigo-600"><i className="ri-arrow-left-line"></i></span>
   <h1 className="p-2 w-fit text-2xl font-semibold  rounded-md text-[#dadada7b]">TvShows</h1>

   
      <Searchbar/>
      <div className=" mx-auto  justify-center  flex gap-10 space-y-10 flex-wrap"> 
</div>
    </div>
<InfiniteScroll
next={()=>setTpage(prev => prev+1)}
dataLength={tv.length}
hasMore={tvhasMore}
loader ={<Loading/>}
>
<div className="mx-auto bg-[#1f1e1e] justify-center pt-25 flex gap-10 space-y-2 flex-wrap">

{tv.map((itm, index) => (
  <Link to={`/tv/details/${itm.id}`}
    key={index}
    className="relative w-[15vw]  shadow-2xl rounded-lg transition-all overflow-hidden group"  // Added 'group' to the outer div for hover effect
  >
    {/* Image */}
    <img
      className="object-contain  cursor-pointer hover:opacity-30 transition-opacity group-hover:opacity-30"  // Added transition-opacity for smooth hover effect
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