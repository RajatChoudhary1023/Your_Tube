import React,{useState,useEffect} from 'react'
import Describechannel from './Describechannel'
import Leftsidebar from '../../Component/Leftsidebar/Leftsidebar'
import Showvideogrid from '../../Component/Showvideogrid/Showvideogrid'
import vid from "../../Component/Video/vid.mp4";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import gettime from '../../action/timeandloc';
import checkIfSouthIndia from '../../action/location';
const Channel = ({seteditcreatechanelbtn,setvideouploadpage}) => {
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

  const {cid}=useParams()
  const vids=useSelector(state=>state.videoreducer)?.data?.filter(q=>q?.videochanel===cid).reverse()
  //     const vids = [
  //   {
  //     _id: 1,
  //     video_src: vid,
  //     Chanel: "62bafe6752cea35a6c30685f",
  //     title: "video 1",
  //     Uploder: "abc",
  //     description: "description of  video 1",
  //   },
  //   {
  //     _id: 2,
  //     video_src: vid,
  //     Chanel: "cdd",
  //     title: "video 2",
  //     Uploder: "abc",
  //     description: "description of  video 2",
  //   },
  //   {
  //     _id: 3,
  //     video_src: vid,
  //     Chanel: "add",
  //     title: "video 3",
  //     Uploder: "abc",
  //     description: "description of  video 3",
  //   },
  //   {
  //     _id: 4,
  //     video_src: vid,
  //     Chanel: "add",
  //     title: "video 3",
  //     Uploder: "abc",
  //     description: "description of  video 3",
  //   },
  // ];
  return (
    <div className="container_Pages_App" style={{backgroundColor:`${background}`,color:`${color}`}}>
      <Leftsidebar/>
      <div className="container2_Pages_App">
        <Describechannel cid={cid} setvideouploadpage={setvideouploadpage} seteditcreatechanelbtn={seteditcreatechanelbtn}/>
        <Showvideogrid vids={vids}/>
      </div>
    </div>
  )
}

export default Channel