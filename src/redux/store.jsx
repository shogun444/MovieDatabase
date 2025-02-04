import { configureStore } from "@reduxjs/toolkit";
import  MovieReducer from "./Slice/movieslice";
import  TvReducer from "./Slice/tvslice";
import  CelebReducer  from "./Slice/celebslice";
const store = configureStore({
reducer : {
  movies : MovieReducer,
  tv : TvReducer,
  celeb : CelebReducer
}
})

export default store