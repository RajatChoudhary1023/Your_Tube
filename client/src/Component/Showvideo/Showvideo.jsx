import React,{useState,useEffect} from 'react'
import './Showvideo.css'
import { Link } from 'react-router-dom'
import moment from "moment"
import gettime from '../../action/timeandloc'
import checkIfSouthIndia from '../../action/location'
const Showvideo = ({vid}) => {
    const [isSouthIndia, setIsSouthIndia] = useState(null);
    useEffect(() => {
        checkIfSouthIndia().then(result => {
            setIsSouthIndia(result); 
            console.log(result); // Logs 1 if in South India, 0 if not
        });
    }, []);
    // console.log(vid)
    const time=gettime();

    const [background,setBackground]=useState('rgb(33, 33, 33)');
    const [color,setColor]=useState('#fff');
    const [background1,setBackground1]=useState('#fff');
    const [color1,setColor1]=useState('rgb(36,36,36)')

    useEffect(()=> {
      if (time>=10 && time<12 && isSouthIndia===1) {
          setBackground('#fff');
          setColor('rgb(36,36,36)');
          setBackground1('rgb(36,36,36)');
          setColor1('#fff');
      }
     },[time,isSouthIndia])
  return (
        <>
      <Link to={`/videopage/${vid._id}`}>
      <video src={`http://localhost:5000/${vid.filepath}`} poster={`http://localhost:5000/${vid.thumbnail}`} className='video_ShowVideo'style={{backgroundColor:`${background}`,color:`${color}`}} >
    </video>
    </Link>
    <div className="video_description">
        <div className="Chanel_logo_App">
            <div className="fstChar_logo_App">
            <>{vid?.uploader?.charAt(0).toUpperCase()}</>
            </div>
        </div>
    
    <div className="video_details">
        <p className="title_vid_ShowVideo" style={{color:`${color}`}}>{vid?.videotitle}</p>
        <pre className="vid_views_UploadTime" style={{color:`${color}`}} >{vid?.uploader}</pre>
        <pre className="vid_views_UploadTime" style={{color:`${color}`}}>
            {vid?.views} views <div className="dot"></div>{moment(vid?.createdat).fromNow()}
        </pre>
    </div>
    </div>
    </>
  )
}

export default Showvideo