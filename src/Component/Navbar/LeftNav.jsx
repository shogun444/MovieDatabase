import { Link } from "react-router-dom";

export default function LeftNav() {
  return (
    <>
      <div className="w-[18%] bg-[#2a2a2a] border-r-2 border-[#3832327b] fixed min-h-screen px-4 py-5">
        {/* Logo Section */}
        <div className="flex items-center justify-center mb-8">
          <i className="ri-tv-fill text-[#4b54bcd2] mr-2 text-3xl"></i>
          <span className="text-3xl flex items-center font-semibold text-[#dadada] tracking-wide transform transition-all duration-300 hover:text-[#4b54bcd2]">
            MOVIEFLIX
          </span>
        </div>

        <hr className="w-[80%] mt-4 mx-auto border-[#3832327b]" />

        {/* Navigation Links */}
        <div className="text-center mt-6 space-y-6">
          <h1 className="nav-item">
            <i className="ri-fire-fill mr-2 text-[#dadada]"></i>
            <Link to={'/toppicks'} className="nav-link">Top Picks</Link>
          </h1>
          <h1 className="nav-item">
            <i className="ri-tv-2-fill mr-2 text-[#dadada]"></i>
            <Link to={'/tvshows'} className="nav-link">TV Shows</Link>
          </h1>
          <h1 className="nav-item">
            <i className="ri-clapperboard-ai-fill mr-2 text-[#dadada]"></i>
            <Link to={'/movies'} className="nav-link">Movies</Link>
          </h1>
          <h1 className="nav-item">
            <i className="ri-bard-fill mr-2 text-[#dadada]"></i>
            <Link to={'/new&popular'} className="nav-link">New & Popular</Link>
          </h1>
          <h1 className="nav-item">
            <i className="ri-file-list-fill mr-2 text-[#dadada]"></i>
            <Link to={'/celebrities'} className="nav-link">Celebrities</Link>
          </h1>
        </div>
      </div>

      {/* Custom Styles for Navigation */}
      <style jsx>{`
        .nav-item {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 12px 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1.1rem;
          color: #dadada;
        }

        .nav-link {
          color: inherit;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .nav-item:hover {
          background-color: #3a3a3a;
          border-radius: 8px;
          transform: scale(1.05);
        }

        .nav-link:hover {
          color: #4b54bcd2;
          font-weight: bold;
        }

        .nav-item i {
          transition: color 0.3s ease;
        }

        .nav-item:hover i {
          color: #4b54bcd2;
        }
      `}</style>
    </>
  );
}
