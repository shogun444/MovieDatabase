import { useDispatch } from "react-redux";
import axios from "../utils/axios";
import { addData } from "./Slice/movieslice";


export const asyncload =(id) => async(dispatch,getState) =>{

  try {

    const detail = await axios.get(`/movie/${id}`)
    const recommended = await axios.get(`/movie/${id}/recommendations`)
    const similar = await axios.get(`/movie/${id}/similar`)
    const videos = await axios.get(`/movie/${id}/videos`)
    const provider = await axios.get(`/movie/${id}/watch/providers`)
 
    let datas = {
  detail : detail.data,
  recommended : recommended.data,
  similar : similar.data,
  videos :videos.data.results.find(n=> n.type === 'Trailer'),
  provider :provider.data.results.IN
 }


dispatch(addData(datas))


  } catch (error) {
    console.log(error.message)
  }
}