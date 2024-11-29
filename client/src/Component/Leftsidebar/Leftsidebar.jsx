import React,{useEffect,useState} from 'react'
import "./Leftsidebar.css"
import shorts from "./shorts.png"
import {AiOutlineHome} from "react-icons/ai"
import {MdOutlineExplore, MdOutlineSubscriptions, MdOutlineVideoLibrary} from "react-icons/md"
import gettime from '../../action/timeandloc'
import { NavLink } from 'react-router-dom'
import checkIfSouthIndia from '../../action/location'
const Leftsidebar = () => {
    const [isSouthIndia, setIsSouthIndia] = useState(null);
    useEffect(() => {
        checkIfSouthIndia().then(result => {
            setIsSouthIndia(result); 
            console.log(result); // Logs 1 if in South India, 0 if not
        });
    }, []);

    const time=gettime();

    const [background,setBackground]=useState('rgb(37, 37, 37)');
    const [color,setColor]=useState('white');
    const [background1,setBackground1]=useState('white');
    const [color1,setColor1]=useState('rgb(37, 37, 37)')
    useEffect(()=> {
        if (time>=10 && time<12 && isSouthIndia===1) {
            setBackground('#fff');
            setColor('rgb(36,36,36)');
            setBackground1('rgb(36,36,36)');
            setColor1('#fff');
        }
       },[time,isSouthIndia])
  return (
    <div className="container_leftSidebar" style={{backgroundColor:`${background}`}}>
        <NavLink to={'/'} className="icon_sidebar_div" style={{color:`${color}`}}>
            <AiOutlineHome size={22} className='icon_sidebar'/>
            <div className="text_sidebar_icon">Home</div>
        </NavLink>
        <div className="icon_sidebar_div" style={{color:`${color}`}}>
            <MdOutlineExplore size={22} className='icon_sidebar'/>
            <div className="text_sidebar_icon">Explore</div>
        </div>
        <div className="icon_sidebar_div" style={{color:`${color}`}}>
            <img src={shorts} width={22} className='icon_sidebar'/>
            <div className="text_sidebar_icon">Shorts</div>
        </div>
        <div className="icon_sidebar_div" style={{color:`${color}`}}> 
            <MdOutlineSubscriptions size={22} className='icon_sidebar'/>
            <div className="text_sidebar_icon" style={{fontSize:"12px"}}>Subscription</div>
        </div>
        <NavLink to={'/Library'} className="icon_sidebar_div" style={{color:`${color}`}}>
            <MdOutlineVideoLibrary size={22} className='icon_sidebar'/>
            <div className="text_sidebar_icon">Library</div>
        </NavLink>
    </div>
  )
}

export default Leftsidebar