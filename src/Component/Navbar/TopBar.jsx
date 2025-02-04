import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import Searchbar from "./Searchbar"; // Import Searchbar component
import Header from "./Header";
import Cards from "./Cards";

export default function TopBar() {
  const [value, setValue] = useState("");
  const [call, setCall] = useState([]);
  const [view, Setview] = useState(false);

  function handle(e) {
    const inp = e.target;
    const datas = inp.value;
    Setview(true);
    setValue(datas);
  }

  function clear() {
    setValue("");
    Setview((prev) => !prev);
  }

  async function search() {
    try {
      const response = await axios.get(`/search/multi?query=${value}`);
      setCall(response.data.results);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    search();
  }, [value]);

  return (
    <>
      {/* Sticky TopBar */}
      <div className=" w-full fixed top-0 left-68.5 z-10 bg-[#1e1d1d] p-3 shadow-lg">
        <div className="flex mr-[14%] items-center">
          {/* Searchbar component added here */}
          <Searchbar />
        </div>
      </div>

      <Header />

      {/* Search Results if view is true */}
      {view && (
        <div className="absolute z-10 text-left rounded-md h-[60vh] mt-3 overflow-auto w-[50%] ml-[15%] transition-all">
          {call.map((itm, index) => (
            <div
              key={index}
              className="flex p-10 items-center duration-200 text-md text-black pl-10 pb-1 bg-[#868689] pt-2 border-b-1 border-b-zinc-300 hover:bg-[#3f3e3e7b] cursor-pointer group"
            >
              <img
                className="h-40 object-fit rounded-md"
                src={
                  itm.backdrop_path || itm.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${itm.backdrop_path || itm.profile_path}`
                    : "https://static.thenounproject.com/png/1554489-200.png"
                }
                alt=""
              />
              <h1 className="font-semibold opacity-45 ml-5 text-xl group-hover:opacity-100 duration-300">
                {itm.original_title || itm.original_name || itm.title || itm.name}
              </h1>
            </div>
          ))}
        </div>
      )}

      {/* Display Cards */}
      <div className="w-full overflow-hidden overflow-x-scroll">
        <Cards />
      </div>
    </>
  );
}
