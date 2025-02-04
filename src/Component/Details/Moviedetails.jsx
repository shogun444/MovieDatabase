import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asyncload } from "../../redux/movieactions";
import { removeData } from "../../redux/Slice/movieslice";
import Loading from "./loading";
import ReactPlayer from "react-player/lazy";
import NotFound from "./Notfound";
import Searchbar from "../Navbar/Searchbar";

export default function Moviedetails() {
  const [visible, setVisible] = useState(false);
  const { movies } = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(asyncload(id));
    return () => dispatch(removeData());
  }, [id]);

  const navigate = useNavigate();
  function back() {
    navigate(-1);
  }

  return movies ? (
    <>
      {/* Fullscreen background and React Player display */}
      {visible && (
        <>
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-90 backdrop-blur-md z-20"></div>
          <div className="absolute top-7 left-5 z-30">
            <span
              onClick={() => setVisible(false)}
              className="p-2 hover:cursor-pointer hover:text-white h-fit rounded-md text-3xl font-semibold text-[#dadada7b] transition-all duration-300"
            >
              <i className="ri-arrow-left-line"></i>
            </span>
          </div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
            {movies.videos.key ? (
              <ReactPlayer
                height={500}
                width={1200}
                url={`https://www.youtube.com/watch?v=${movies.videos.key}`}
              />
            ) : (
              <NotFound />
            )}
          </div>
        </>
      )}

      <div className="w-full relative h-screen">
        {/* Back Button & IMDB Link */}
        <div className="flex w-full absolute items-center top-5 left-10">
          <span
            onClick={back}
            className="p-2 hover:cursor-pointer hover:text-white h-fit rounded-md text-3xl font-semibold text-indigo-600 transition-all duration-300"
          >
            <i className="ri-arrow-left-line"></i>
          </span>
          <a
            className="ml-5 text-white transition-all duration-200 text-sm font-semibold rounded-md px-4 py-2 bg-indigo-600"
            target="_blank"
            href={`https://www.imdb.com/title/${movies.detail.imdb_id}`}
            rel="noopener noreferrer"
          >
            IMDB
          </a>
          <Searchbar />
        </div>

        {/* Stylish Black Box with Vertical Scroller */}
        <div className="p-6 absolute bg-black/80 rounded-lg shadow-lg backdrop-blur-md gap-6 top-23 left-20 w-[88%] h-[80vh] overflow-y-auto">
          {/* Movie Info */}
          <div className="p-4 flex gap-6 justify-between">
            <div className="flex gap-6">
              <img
                className="h-[40vh] object-contain rounded-md shadow-md"
                src={`https://image.tmdb.org/t/p/original/${movies.detail.poster_path}`}
                alt={movies.detail.title || movies.detail.original_title}
              />
              <h1 className="text-4xl text-gray-200 font-semibold">
                {movies.detail.title || movies.detail.original_title}
                <h1 className="h-[15vh] flex font-normal text-xs items-center text-white">
                  " {movies.detail.tagline} "
                </h1>
              </h1>
            </div>
            <div className="flex items-start w-[25vw] text-gray-300">
              <h1 className="mt-4 text-sm flex items-center">
                <i className="ri-calendar-line mr-2"></i> {movies.detail.release_date}
              </h1>
              <h1 className="ml-4 text-sm mt-4 flex items-center">
                <i className="ri-time-line mr-2"></i> {movies.detail.runtime} mins
              </h1>
            </div>
          </div>

          <div className="absolute top-[40%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 text-center">
            <button
              onClick={() => setVisible((prev) => !prev)}
              className="text-white relative font-bold text-2xl py-3 px-6 rounded-full bg-indigo-600 shadow-lg hover:bg-indigo-700 hover:cursor-pointer transition-all duration-300"
            >
              Watch Now
            </button>
          </div>

          {/* Overview Section */}
          <div className="text-gray-200">
            <h1 className="text-white flex items-center justify-center ml-[22px] w-12 h-12 rounded-full gap-1">
              Rating
              <i className="text-yellow-400 ri-star-line"></i>
              {movies.detail.vote_average?.toFixed(1)}
            </h1>
            <h1 className="font-semibold text-lg mb-2">Overview</h1>
            <p className="text-gray-300 text-sm leading-relaxed">{movies.detail.overview}</p>
          </div>

          {/* Recommendation Section */}
          <div className="w-full text-center h-[35vh] mt-8">
            <h1 className="text-sm sticky top-0 bg-black/70 text-white z-10 py-2">
              Recommendations
            </h1>
            <div className="flex flex-nowrap overflow-x-auto gap-4 mt-4 py-4">
              {movies.recommended.results?.map((itm, index) => (
                <Link
                  to={`/movie/details/${itm.id}`}
                  key={index}
                  className="bg-gray-800 p-4 rounded-lg shadow-md w-[12vw] flex-shrink-0"
                >
                  <img
                    className="object-contain rounded-md"
                    src={`https://image.tmdb.org/t/p/original${itm.poster_path}`}
                    alt={itm.title || itm.name}
                  />
                  <h2 className="text-white text-sm">{itm.title || itm.name}</h2>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Background Image */}
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movies.detail.backdrop_path}`}
          alt={movies.detail.title || movies.detail.original_title}
        />
      </div>
    </>
  ) : (
    <Loading />
  );
}
