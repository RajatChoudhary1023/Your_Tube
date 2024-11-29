import React,{useState,useEffect} from 'react'
import Leftsidebar from '../../Component/Leftsidebar/Leftsidebar'
import {FaHistory} from "react-icons/fa"
import { RiDownload2Line } from "react-icons/ri";
import {MdOutlineWatchLater} from "react-icons/md"
import {AiOutlineLike} from "react-icons/ai"
import vid from "../../Component/Video/vid.mp4"
import WHLvideolist from '../../Component/WHL/WHLvideolist'
import { useSelector } from 'react-redux'
import gettime from '../../action/timeandloc'
import checkIfSouthIndia from '../../action/location'
import './Library.css'
const Library = () => {
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
    // const vids=[
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
    const likedvideolist=useSelector((state)=>state.likedvideoreducer)
    const watchlatervideolist=useSelector((s)=>s.watchlaterreducer)
    const watchhistoryvideolist=useSelector(s=>s.historyreducer)
    const downloadsvideolist=useSelector(s=>s.downloadsreducer)
  return (
    <div className="container_Pages_App" style={{backgroundColor:`${background}`}}>
        <Leftsidebar/>
        <div className='container2_Pages_App'>
            <div className="container_libraryPage" >
                <h1 className="title_container_LibraryPage"style={{color:`${color}`}}>
                    <b>
                        <FaHistory/>
                    </b>
                    <b>History</b>
                </h1>
                <div className="container_videoList_LibraryPage">
                    <WHLvideolist page={"History"} currentuser={currentuser?.result?._id} videolist={watchhistoryvideolist}/>
                </div>
            </div>
            <div className="container_libraryPage">
                <h1 className="title_container_LibraryPage" style={{color:`${color}`}}>
                    <b>
                        <MdOutlineWatchLater/>
                    </b>
                    <b>Watch later</b>
                </h1>
                <div className="container_videoList_LibraryPage">
                    <WHLvideolist page={"Watch Later"} currentuser={currentuser?.result?._id} videolist={watchlatervideolist}/>
                </div>
            </div>
            <div className="container_libraryPage">
                <h1 className="title_container_LibraryPage" style={{color:`${color}`}}>
                    <b>
                        <AiOutlineLike/>
                    </b>
                    <b>Liked Videos</b>
                </h1>
                <div className="container_videoList_LibraryPage">
                    <WHLvideolist page={"Liked Videos"} currentuser={currentuser?.result?._id} videolist={likedvideolist}/>
                </div>
            </div>
            <div className="container_libraryPage">
                <h1 className="title_container_LibraryPage" style={{color:`${color}`}}>
                    <b>
                        <RiDownload2Line/>
                    </b>
                    <b>Downloads</b>
                </h1>
                <div className="container_videoList_LibraryPage">
                    <WHLvideolist page={"Downloads"} currentuser={currentuser?.result?._id} videolist={downloadsvideolist}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Library
