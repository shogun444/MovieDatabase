import { createSlice } from "@reduxjs/toolkit";

export const TvSlice =  createSlice({
name : 'tvslice',
initialState : {},
reducers : {
  addD : (state,actions) => {

    state.tv = actions.payload

  },
  removeD : (state,actions) =>{
    state.tv = null
  }
}

})


export const {addD,removeD} = TvSlice.actions
export default TvSlice.reducer