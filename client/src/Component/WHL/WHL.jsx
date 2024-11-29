import React,{useState,useEffect} from 'react'
import Leftsidebar from '../Leftsidebar/Leftsidebar'
import "./WHL.css"
import WHLvideolist from "./WHLvideolist"
import gettime from '../../action/timeandloc';
import { useSelector,useDispatch } from 'react-redux'
import { clearhistory } from '../../action/history'
import checkIfSouthIndia from '../../action/location';
const WHL = ({page,videolist}) => {
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
    // console.log(videolist)
    const currentuser=useSelector(state => state.currentuserreducer);
    const dispatch=useDispatch()
    const handleclearhistory=()=>{
        if(currentuser){
            dispatch(clearhistory({
                userid:currentuser?.result._id
            }))
        }
    }
  return (
    <div className="container_Pages_App">
        <Leftsidebar/>
        <div className="container2_Pages_App" style={{backgroundColor:`${background}`}}>
            <p className="conatiner_whl" >
                <div className="box_WHL leftside_whl" style={{color:`${color}`,backgroundColor:`${background}`}} >
                    <b style={{color:`${color}`}}>Your {page} Shown Here</b>
                    {
                        page === "History" &&
                        <div className="clear_History_btn" style={{color:`${color}`}}  onClick={()=>handleclearhistory()}>Clear History</div>
                    }
                </div>
                <div className="rightSide_whl">
                    <h1 style={{color:`${color}`}}>{page}</h1>
                    <div className="whl_list">
                        <WHLvideolist page={page} currentuser={currentuser.result._id} videolist={videolist}/>
                    </div>
                </div>
            </p>
        </div>
    </div>
  )
}

export default WHL