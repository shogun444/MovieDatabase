import { useContext } from "react";
import { cardContext } from "../Navbar/Data";  // Correct import from Data
import { Link } from "react-router-dom";
import Loading from "../Details/Loading";

export default function Header() {
  const { photo, trendingCard, loading } = useContext(cardContext);  // Get data from context

  if(loading) {
    return(
    <div className="absolute top-0 left-170">
<Loading/> 

    </div>
    )
    
    }
    console.log(photo)

  return (
    <div  className="h-[70vh] mt-20 w-[82%] bg-black  relative">

<Link to={`${photo.
media_type}/details/${photo.id}}`}> 

<img
        className="h-full overflow-hidden shadow-2xl bg-transparent rounded-sm w-[99%] mx-auto object-cover"
        src={`https://image.tmdb.org/t/p/original${photo?.backdrop_path}`}
      
      />
<div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>


      <h1 className="absolute top-75 left-5 text-white text-4xl font-bold mt-5 z-10">
        {photo?.title || photo?.original_name}
      </h1>

   
      <h1 className="font-semibold text-xl absolute top-8 left-5 capitalize pr-4 text-white">
        {photo?.media_type}
      </h1>

     
      <h1 className="font-semibold absolute top-8 right-27 border-r-4 pr-4 text-white">
        IMDB ⭐ {photo?.vote_average}
      </h1>

      <h1 className="font-semibold absolute top-8 right-19 capitalize text-white">
        {photo?.original_language}
      </h1>
    
      <h1 className="absolute top-88 left-5 text-white w-[40%] text-sm font-semibold mt-5">
  {photo?.overview?.split(" ").slice(0, 50).join(" ") + (photo?.overview?.split(" ").length > 50 ? "...more" : "")}
</h1>


      <Link className="absolute top-6 left-20 text-white text-xl font-semibold bg-indigo-600 p-2 rounded-md">
        Watch Trailer
      </Link>

</Link>

      
    
  
    </div>

  );
}
