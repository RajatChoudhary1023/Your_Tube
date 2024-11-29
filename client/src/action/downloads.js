import * as api from "../Api";
export const addtodownloads=(downloadsdata)=>async(dispatch)=>{
    try {
        const {data}=await api.addtodownloads(downloadsdata)
        dispatch({type:"POST_DOWNLOADS",data})
        dispatch(getalldownloads())
    } catch (error) {
        console.log(error)
    }
}

export const  getalldownloads=()=>async(dispatch)=>{
    try {
        const {data}=await api.getalldownloads()
        dispatch({type:"FETCH_ALL_DOWNLOADS",payload:data})
    } catch (error) {
        console.log(error)
    }
}

export const deletedownloads=(downloadsdata)=>async(dispatch)=>{
    try {
        const {videoid,viewer}=downloadsdata
        await api.deletedownloads(videoid,viewer)
        dispatch(getalldownloads())
    } catch (error) {
        console.log(error)
    }
}