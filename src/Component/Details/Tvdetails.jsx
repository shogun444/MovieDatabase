import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asyncloadtv } from "../../redux/tvactions";
import { removeD } from "../../redux/Slice/tvslice";
import Loading from "./loading";
import ReactPlayer from "react-player";
import NotFound from "./Notfound";
import Searchbar from "../Navbar/Searchbar";

export default function Tvdetails() {
  const [visible, setVisible] = useState(false);
  const { tv } = useSelector((state) => state.tv);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => dispatch(removeD());
  }, [id]);

  function back() {
    navigate(-1);
  }

  // Ensure tv exists before accessing properties
  if (!tv || !tv.detail) {
    return <Loading />; // Show loading if data is not available
  }
  console.log(tv)

  return (
    <>
      {/* Video Player Modal */}
      {visible && tv.videos?.key && (
        <>
          {/* Fullscreen Background with Blur Effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-90 backdrop-blur-md z-20"></div>

          {/* Back Button */}
          <div className="absolute top-7 left-5 z-30">
            <span
              onClick={() => setVisible(false)}
              className="p-2 hover:cursor-pointer hover:text-white h-fit rounded-md text-3xl font-semibold text-[#dadada7b] transition-all duration-300"
            >
              <i className="ri-arrow-left-line"></i>
            </span>
          </div>

          {/* React Player in the Center */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
            <ReactPlayer
              height={500}
              width={1200}
              url={`https://www.youtube.com/watch?v=${tv.videos.key}`}
            />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="w-full relative h-screen">
        {/* Back Button & IMDB Link */}
        <div className="flex w-full absolute items-center top-5 left-10">
          <span
            onClick={back}
            className="p-2 hover:cursor-pointer hover:text-white h-fit rounded-md text-3xl font-semibold text-indigo-600"
          >
            <i className="ri-arrow-left-line"></i>
          </span>

            <a
              className="ml-5 text-white bg-indigo-600 transition px-4 py-2 rounded-md duration-200"
              target="_blank"
              href={`https://www.imdb.com/title/${tv.detail.imdb_id}`}
              rel="noopener noreferrer"
            >
              IMDB
            </a>
              <Searchbar/>
        
        </div>

        {/* Stylish Black Box with Vertical Scroller */}
        <div className="p-6 absolute bg-black/80 rounded-lg shadow-lg backdrop-blur-md gap-6 top-23 left-20 w-[88%] h-[80vh] overflow-y-auto">
          {/* Movie Info */}
          <div className="p-4 flex gap-6 justify-between">
            {/* Left: Poster & Title */}
            <div className="flex gap-6">
              {tv.detail.poster_path ? (
                <img
                  className="h-[40vh] object-contain rounded-md shadow-md"
                  src={`https://image.tmdb.org/t/p/original/${tv.detail.poster_path}`}
                  alt={tv.detail.name || tv.detail.original_name}
                />
              ) : (
                <NotFound />
              )}

              <h1 className="text-4xl text-gray-200 font-semibold">
                {tv.detail.name || tv.detail.original_name}
                {tv.detail.tagline && (
                  <h1 className="h-[15vh] flex font-normal text-xs items-center text-white">
                    " {tv.detail.tagline} "
                  </h1>
                )}
              </h1>
            </div>

            {/* Right: Release Date */}
            <div className="flex items-start w-[25vw] text-gray-300">
              {tv.detail.first_air_date && (
                <h1 className="mt-4 text-sm flex items-center">
                  <i className="ri-calendar-line mr-2"></i> {tv.detail.first_air_date}
                </h1>
              )}
            </div>
          </div>

          {/* Watch Now Button */}
          {tv.videos?.key && (
            <div className="absolute top-[40%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 text-center">
              <button
                onClick={() => setVisible((prev) => !prev)}
                className="text-white relative font-bold text-2xl py-3 px-6 rounded-full bg-indigo-600 shadow-lg hover:bg-indigo-700 hover:cursor-pointer transition-all duration-300"
              >
                Watch Now
              </button>
            </div>
          )}

          {/* Overview Section */}
          <div className="text-gray-200">
            <h1 className="text-white flex items-center justify-center ml-[22px] w-12 h-12 rounded-full gap-1">
              Rating
              <i className="text-yellow-400 ri-star-line"></i>
              {tv.detail.vote_average?.toFixed(1) || "N/A"}
            </h1>

            <h1 className="font-semibold text-lg mb-2">Overview</h1>
            <p className="text-gray-300 text-sm leading-relaxed">
              {tv.detail.overview || "No overview available."}
            </p>
          </div>

          {/* Recommendation Section */}
          {tv.recommended.results?.length > 0 && (
            <div className="w-full text-center h-[35vh] mt-8">
              <h1 className="text-sm  top-0 bg-black/70 text-white z-10 py-2">
                Seasons
              </h1>

              {/* Horizontal Scrollable Container */}
              <div className="flex flex-nowrap overflow-x-auto  gap-4 mt-3 py-4">
                {tv.detail.seasons.map((itm, index) => (
                  <div
                
                    key={index}
                    className="bg-gray-800 p-4 rounded-lg shadow-md w-[12vw] flex-shrink-0"
                  >
                    {itm.poster_path ? (
                      <img
                        className="object-contain rounded-md"
                        src={`https://image.tmdb.org/t/p/original${itm.poster_path}`}
                        alt={itm.title || itm.name}
                      />
                    ) : (
                      <><h1 className="h-[32vh] flex justify-center  items-center">No Image</h1></>
                    )}
                    <h2 className="text-white text-sm">{itm.title || itm.name}</h2>
                  </div>
             
                ))}
              </div>
            </div>
          )}
          <div> 
 {tv.detail.seasons &&  (<div className="w-full text-center h-[35vh] mt-45">
              <h1 className="text-sm bg-black/70 text-white z-10 py-2">
                Recommendations
              </h1>

              {/* Horizontal Scrollable Container */}
              <div className="flex flex-nowrap overflow-x-auto gap-4 mt-4 py-4">
                {tv.recommended.results.map((itm, index) => (
                  <Link
                    to={`/tv/details/${itm.id}`}
                    key={index}
                    className="bg-gray-800 p-4 rounded-lg shadow-md w-[12vw] flex-shrink-0"
                  >
                    {itm.poster_path ? (
                      <img
                        className="object-contain rounded-md"
                        src={`https://image.tmdb.org/t/p/original${itm.poster_path}`}
                        alt={itm.title || itm.name}
                      />
                    ) : (
                    <h1  className=" mb-51 flex justify-center items-center " >No Image</h1>
                    )}
                    <h2 className="text-white text-sm">{itm.title || itm.name}</h2>
                  </Link>
                ))}
              </div>
            </div>
          )}

</div>
        </div>

       

        {/* Background Image */}
        {tv.detail.backdrop_path ? (
          <img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/original/${tv.detail.backdrop_path}`}
            alt={tv.detail.title || tv.detail.original_title}
          />
        ) : (
          <NotFound />
        )}
      </div>
    </>
  );
}

