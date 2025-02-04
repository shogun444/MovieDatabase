import { createSlice } from "@reduxjs/toolkit";

export const MovieSlice =  createSlice({
name : 'movieslice',
initialState : {},
reducers : {
  addData : (state,actions) => {

    state.movies = actions.payload

  },
  removeData : (state,actions) =>{
    state.movies = null
  }
}

})


export const {addData,removeData} = MovieSlice.actions
export default MovieSlice.reducer