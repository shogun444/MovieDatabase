import { createSlice } from "@reduxjs/toolkit";

export const Celebslice = createSlice({
  name : 'celebslice',
  initialState : {},
  reducers : {
 addC : (state,actions)=> {
  state.celebs = actions.payload
},
removeC : (state,actions) => {
  state.celebs = null
 }
  }
})

export const {addC,removeC} = Celebslice.actions
export default Celebslice.reducer