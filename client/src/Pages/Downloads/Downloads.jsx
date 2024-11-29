import React from 'react'
import vid from "../../Component/Video/vid.mp4"
import WHL from '../../Component/WHL/WHL'
import { useSelector } from 'react-redux'
const Downloads = () => {
  const downloadsvideolist=useSelector((s)=>s.downloadsreducer)

  return (
    <WHL page={"Downloads"} videolist={downloadsvideolist}/>
  )
}

export default Downloads