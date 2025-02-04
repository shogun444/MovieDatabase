import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asyncC } from "../../redux/celebactions";
import { removeC } from "../../redux/Slice/celebslice";
import Loading from "./Loading";
import Searchbar from "../Navbar/Searchbar";

export default function Celebdetails() {
  const { celebs } = useSelector((state) => state.celeb);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(asyncC(id));
    return () => dispatch(removeC());
  }, [id]);

  const navigate = useNavigate();
  function back() {
    navigate(-1);
  }
  console.log(celebs)

  if (!celebs || !celebs.detail) {
    return <Loading />;
  }
  console.log(celebs)

  return (
    <>
      <div className="w-full relative h-screen">
        {/* Back Button & IMDB Link */}
        <div className="flex w-full absolute items-center top-5 left-10">
          <span
            onClick={back}
            className="p-2 hover:cursor-pointer hover:text-white h-fit rounded-md text-3xl font-semibold text-indigo-600 transition-all duration-300"
          >
            <i className="ri-arrow-left-line"></i>
          </span>

          {celebs.detail.imdb_id && (
            <a
              className="ml-5 text-white transition-all duration-200 text-sm font-semibold rounded-md px-4 py-2 bg-indigo-600"
              target="_blank"
              href={`https://www.imdb.com/name/${celebs.detail.imdb_id}`}
              rel="noopener noreferrer"
            >
              IMDB
            </a>
          )}
          <Searchbar />
        </div>

        {/* Content Box */}
        <div className="p-6 absolute bg-black/80 rounded-lg shadow-lg backdrop-blur-md gap-6 top-23 left-20 w-[88%] h-[80vh] overflow-y-auto">
          {/* Celebrity Info */}
          <div className="p-4 flex gap-6 justify-between">
            {/* Left: Poster & Name */}
            <div className="flex gap-6">
              <img
                className="h-[40vh] object-contain rounded-md shadow-md"
                src={`https://image.tmdb.org/t/p/original/${celebs.detail.profile_path}`}
                alt={celebs.detail.name}
              />

              <h1 className="text-4xl text-gray-200 font-semibold">
                {celebs.detail.name}
                <h1 className="h-[15vh] flex font-normal text-xs items-center text-white">
                  {celebs.detail.also_known_as}
                </h1>
              </h1>
            </div>

            {/* Right: Known For & Popularity */}
            <div className="flex items-start w-[25vw] text-gray-300">
              <h1 className="mt-4 text-sm flex items-center">
                <i className="ri-star-line mr-2"></i> Popularity: {celebs.detail.popularity?.toFixed(1)}
              </h1>
              <h1 className="ml-4 text-sm mt-4 flex items-center">
                <i className="ri-film-line mr-2"></i> Known for: {celebs.detail.known_for_department}
              </h1>
            </div>
          </div>

          {/* Overview Section */}
          <div className="text-gray-200">
            <h1 className="font-semibold text-lg mb-2">Biography</h1>
            <p className="text-gray-300 text-sm leading-relaxed">
              {celebs.detail.biography || "No biography available."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
