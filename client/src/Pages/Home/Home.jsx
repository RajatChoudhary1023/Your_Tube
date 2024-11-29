import React,{useEffect,useState} from 'react'
import Leftsidebar from '../../Component/Leftsidebar/Leftsidebar'
import "./Home.css"
import Showvideogrid from '../../Component/Showvideogrid/Showvideogrid'
import vid from "../../Component/Video/vid.mp4"
import { useSelector } from 'react-redux'
import gettime from '../../action/timeandloc'
import checkIfSouthIndia from '../../action/location'
const Home = () => {
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
  const [background1,setBackground1]=useState('rgb(68,68,68)');
  const [color1,setColor1]=useState('rgb(36,36,36)')
  useEffect(()=> {
    if (time>=10 && time<12 && isSouthIndia===1) {
        setBackground('#fff');
        setColor('rgb(36,36,36)');
        setBackground1('rgb(241, 244, 230)');
        setColor1('#fff');
    }
   },[time,isSouthIndia])


  const vids=useSelector(state=>state.videoreducer)?.data?.filter(q=>q).reverse();
  // const vids=[
  //   {
  //     _id:1,
  //     video_src:vid,
  //     chanel:"wvjwenfj3njfwef",
  //     title:"video 1",
  //     uploader:"abc",
  //     description:"description of video 1"
  //   },
  //   {
  //     _id:1,
  //     video_src:vid,
  //     chanel:"wvjwenfj3njfwef",
  //     title:"video 1",
  //     uploader:"abc",
  //     description:"description of video 1"
  //   },
  //   {
  //     _id:2,
  //     video_src:vid,
  //     chanel:"wvjwenfj3njfwef",
  //     title:"video 2",
  //     uploader:"abc",
  //     description:"description of video 2"
  //   },
  //   {
  //     _id:3,
  //     video_src:vid,
  //     chanel:"wvjwenfj3njfwef",
  //     title:"video 3",
  //     uploader:"abc",
  //     description:"description of video 3"
  //   },
  //   {
  //     _id:4,
  //     video_src:vid,
  //     chanel:"wvjwenfj3njfwef",
  //     title:"video 4",
  //     uploader:"abc",
  //     description:"description of video 4"
  //   },
  // ]
  const navlist=[
    "All",
    "Python",
    "Java",
    "C++",
    "Movies",
    "Science",
    "Animation",
    "Gaming",
    "Comedy"
  ];
  return (
    <div className="container_Pages_App" style={{backgroundColor:`${background}`}}>
      <Leftsidebar/>
      <div className="container2_Pages_App">
        <div className="navigation_Home" style={{backgroundColor:`${background}`}}>
          {navlist.map((m)=>{
            return(
              <p key={m} className='btn_nav_home' style={{ color:`${color}`,backgroundColor:`${background1}`}}>{m}</p>
            );
          })}
        </div>
        <Showvideogrid vid={vids}/>
      </div>
    </div>
  )
}

export default Home