import { useContext } from "react"
import { cardContext } from "./Data"
import { Link } from "react-router-dom"
Link


export default function Cards({data}){
  const {trendingCard,loading} = useContext(cardContext)



  if(!trendingCard || trendingCard.length == 0 ) {
    return<h1>Loading...</h1>
   }

  
  return(<>




  <div className="min-w-full p-2 bg-[#1211119a] mr-2 ">
  <h1 className="font-semibold text-white mb-3 ml-5 text-2xl">Trending</h1>


  <div className=" w-fit p-2 pt-2 flex space-x-5 overflow-hidden mr-10 pr-8  ">
  
     {trendingCard.map((itm,index)=> (

      <Link to={`/${itm.media_type}/details/${itm.id}`} key={index} className="h-[35vh] mx-2 flex flex-col rounded-xl w-[15vw]  ">
       
<img className="h-full  object-cover rounded-md"  src={`https://image.tmdb.org/t/p/original${itm.backdrop_path}`}  /> 

      <h1 className="text-white font-semibold text-xl truncate">
        {itm.original_name || itm.title}
      </h1>


      </Link >
))}

  </div>
  </div>
  

  </>)
}