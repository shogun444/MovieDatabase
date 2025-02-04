import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import Data from "./Component/Navbar/Data";
import Toppicks from "./Component/Toppicks";
import Categorycards from "./Component/Navbar/Categorycards";
import Popular from "./Component/Popular";
import Movies from "./Component/Movies";
import Tvshows from "./Component/Tvshows";
import { Provider } from "react-redux";
import store from "./redux/store";
import Moviedetails from "./Component/Details/Moviedetails";
import Tvdetails from "./Component/Details/Tvdetails";
import Celebdetails from "./Component/Details/CelebDetails";
import Celebrities from "./Component/Celebrites";





export default function App(){
  return(<>
  <Provider store={store}> 
  <BrowserRouter>
  <Data>
  <div className="bg-zinc-700 min-h-screen w-full overflow-hidden"> 


  <Routes>

  <Route path="/" element={<Home/>}>  </Route>
  <Route path="/toppicks" element={<Toppicks/>}></Route>
  <Route path="/new&popular" element={<Popular/>}></Route>
  <Route path="/cards" element={<Categorycards/>}></Route>
  <Route path="/movies" element={<Movies/>}>
      
  </Route>
  <Route path="/movie/details/:id" element={<Moviedetails/>}></Route>
   
   <Route path="/tvshows" element={<Tvshows/>}>  
   
   </Route>
   <Route path="/tv/details/:id" element={<Tvdetails/>}></Route>

   <Route path="/celebrities" element={<Celebrities/>}></Route>
   <Route path="/" element={<Celebdetails/>}>
   <Route path="person/details/:id"></Route>
   <Route path="person/:id"></Route>
   </Route>
   
</Routes>
  
</div>




  </Data>
  </BrowserRouter>
  </Provider>
  </>)
}