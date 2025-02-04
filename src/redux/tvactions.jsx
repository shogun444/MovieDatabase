import { useDispatch } from "react-redux";
import axios from "../utils/axios";
import { addD } from "./Slice/tvslice";


export const asyncloadtv =(id) => async(dispatch,getState) =>{

  try {

    const detail = await axios.get(`/tv/${id}`)
    const recommended = await axios.get(`/tv/${id}/recommendations`)
    const similar = await axios.get(`/tv/${id}/similar`)
    const videos = await axios.get(`/tv/${id}/videos `)
    const provider = await axios.get(`/tv/${id}/watch/providers`)
 
    let tvdatas = {
  detail : detail.data,
  recommended : recommended.data,
  similar : similar.data,
  videos :videos.data.results.find(n=> n.type === 'Trailer'),
  provider :provider.data.results.IN
 }


dispatch(addD(tvdatas))


  } catch (error) {
    console.log(error.message)
  }
}