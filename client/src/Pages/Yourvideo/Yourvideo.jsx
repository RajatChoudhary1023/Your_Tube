import React,{useState,useEffect} from 'react'
import "./Yourvideo.css"
import vid from "../../Component/Video/vid.mp4"
import Showvideogrid from '../../Component/Showvideogrid/Showvideogrid'
import Leftsidebar from '../../Component/Leftsidebar/Leftsidebar'
import { useSelector } from 'react-redux'
import gettime from '../../action/timeandloc';
import checkIfSouthIndia from '../../action/location';

const Yourvideo = () => {

    const [isSouthIndia, setIsSouthIndia] = useState(null);
    useEffect(() => {
        checkIfSouthIndia().then(result => {
            setIsSouthIndia(result); 
            console.log(result); // Logs 1 if in South India, 0 if not
        });
    }, []);
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

    const currentuser=useSelector(state => state.currentuserreducer);
    const yourvideolist=useSelector(s=>s.videoreducer)?.data?.filter(q=>q.videochanel===currentuser?.result._id).reverse()
    // const yourvideolist=[
    //     {
    //       _id:1,
    //       video_src:vid,
    //       chanel:"wvjwenfj3njfwef",
    //       title:"video 1",
    //       uploader:"abc",
    //       description:"description of video 1"
    //     },
    //     {
    //       _id:1,
    //       video_src:vid,
    //       chanel:"wvjwenfj3njfwef",
    //       title:"video 1",
    //       uploader:"abc",
    //       description:"description of video 1"
    //     },
    //     {
    //       _id:2,
    //       video_src:vid,
    //       chanel:"wvjwenfj3njfwef",
    //       title:"video 2",
    //       uploader:"abc",
    //       description:"description of video 2"
    //     },
    //     {
    //       _id:3,
    //       video_src:vid,
    //       chanel:"wvjwenfj3njfwef",
    //       title:"video 3",
    //       uploader:"abc",
    //       description:"description of video 3"
    //     },
    //     {
    //       _id:4,
    //       video_src:vid,
    //       chanel:"wvjwenfj3njfwef",
    //       title:"video 4",
    //       uploader:"abc",
    //       description:"description of video 4"
    //     },
    //   ]
  return (
    <div className="container_Pages_App">
        <Leftsidebar/>
        <div className="container2_Pages_App" style={{backgroundColor:`${background}`}}>
            <div className="container_yourvideo">
                <h1 style={{color:`${color}`}}>Your Video</h1>
                {
                    currentuser ?(<>
                    <Showvideogrid vid={yourvideolist}/>
                    </>):<>
                    <h3>PLZ Login to see Your upload video list</h3>
                    </>
                }
            </div>
        </div>
    </div>
  )
}

export default Yourvideo