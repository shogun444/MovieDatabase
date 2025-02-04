import axios from "../../utils/axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Searchbar() {
  const [value, setValue] = useState("");
  const [call, setCall] = useState([]);
  const [view, setView] = useState(false);

  function handle(e) {
    const datas = e.target.value;
    setView(true);
    setValue(datas);
  }

  function clear() {
    setValue("");
    setView(false);
  }

  async function search() {
    try {
      const response = await axios.get(`/search/multi?query=${value}`);
      setCall(response.data.results);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    if (value.trim() !== "") {
      search();
    }
  }, [value]);

  return (
    <div className="relative w-full flex justify-center mt-1 mb-3">
      {/* Search Bar */}
      <div className="relative w-[60%]">
        <input
          value={value}
          onChange={handle}
          type="text"
          placeholder="Search for movies, TV shows, or celebrities..."
          className="w-full px-5 py-2 text-lg rounded-md border-gray-400 border-2 bg-[#dadada7b] text-black focus:ring-2 focus:ring-gray-600 outline-none transition-all duration-300 shadow-lg"
        />
        <i className="ri-search-line absolute right-5 top-1/2 transform -translate-y-1/2 text-xl text-gray-200 "></i>

        {/* Clear Button */}
        {view && (
          <button onClick={clear} className="absolute right-12 top-1/2 transform -translate-y-1/2 text-white hover:text-black transition">
            <i className="ri-close-line text-2xl"></i>
          </button>
        )}
      </div>

      {/* Search Results */}
      {view && (
        <div className="absolute top-16 w-[60%] bg-gray-900 text-white rounded-lg shadow-lg max-h-[60vh] overflow-auto p-4 z-50">
          {call.length > 0 ? (
            call.map((itm, index) => (
              <Link 
                to={`/${itm.media_type}/details/${itm.id}`} 
                key={index}
                className="flex items-center p-4 rounded-lg hover:bg-gray-800 transition-all cursor-pointer"
              >
                <img
                  className="h-16 w-16 object-cover rounded-md"
                  src={
                    itm.backdrop_path || itm.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${itm.backdrop_path || itm.profile_path}`
                      : "https://static.thenounproject.com/png/1554489-200.png"
                  }
                  alt={itm.title || itm.name}
                />
                <h1 className="ml-4 text-lg font-semibold">
                  {itm.original_title || itm.original_name || itm.title || itm.name}
                </h1>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-400">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
}
