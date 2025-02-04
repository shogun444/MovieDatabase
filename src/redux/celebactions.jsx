
import axios from "../utils/axios";
import { addC } from "./Slice/celebslice";



export const asyncC = (id) => async(dispatch,getState) => {
try {
  
 
const detail = await axios.get(`/person/${id}`)
const credits = await axios.get(`/person/${id}/combined_credits`)

const info = {
  detail : detail.data,
  credits :credits.data
}
dispatch(addC(info))
} 
catch (error) {
  console.log(error)
}
} 