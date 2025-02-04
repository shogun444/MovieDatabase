import { createContext, useEffect, useState } from "react";
import axios from "../../utils/axios";

export const cardContext = createContext();

export default function Data({ children }) {
  const [photo, setPhoto] = useState([]);
  const [trendingCard, setTrendingCard] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Fetch Home Page Data (Trending Cards, Random Photo)
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/trending/all/day");
        setTrendingCard(response.data.results);
        const randomItem = response.data.results[Math.floor(Math.random() * 20)];
        setPhoto(randomItem);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <cardContext.Provider
      value={{
        trendingCard,
        loading,
        photo
      }}
    >
      {children}
    </cardContext.Provider>
  );
}
