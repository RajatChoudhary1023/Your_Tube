import React,{useEffect,useState} from 'react'
import "./Leftsidebar.css"
import { AiFillPlaySquare, AiOutlineHome, AiFillLike } from 'react-icons/ai'
import { MdOutlineExplore, MdOutlineVideoLibrary, MdSubscriptions, MdOutlineWatchLater } from "react-icons/md"
import { FaHistory } from 'react-icons/fa'
import { RiDownload2Line } from "react-icons/ri";
import shorts from "./shorts.png"
import gettime from '../../action/timeandloc'
import { NavLink } from 'react-router-dom'
import checkIfSouthIndia from '../../action/location'
const Drawersliderbar = ({ toggledraw, toggledrawersidebar }) => {
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
    <div className="container_DrawaerLeftSidebar" style={toggledrawersidebar}>
      <div className="container2_DrawaerLeftSidebar" style={{backgroundColor:`${background}`}}>
        <div className="Drawer_leftsidebar">
          <NavLink to={'/'} className="icon_sidebar_div" style={{backgroundColor:`${background}`,color:`${color}`}}>
            <p>
              <AiOutlineHome size={22} className='icon_sidebar' style={{ margin: "auto 0.7rem" }} />
              <div className="text_sidebar_icon">Home</div>
            </p>
          </NavLink>
          <div className="icon_sidebar_div" style={{backgroundColor:`${background}`,color:`${color}`}}>
            <p>
              <MdOutlineExplore size={22} className='icon_sidebar' style={{ margin: "auto 0.7rem" }} />
              <div className="text_sidebar_icon">Explore</div>
            </p>
          </div>
          <div className="icon_sidebar_div" style={{backgroundColor:`${background}`,color:`${color}`}}>
            <p>
              <img src={shorts} width={22} className='icon_sidebar' style={{ margin: "auto 0.7rem" }} />
              <div className="text_sidebar_icon">Shorts</div>
            </p>
          </div>

          <div className="icon_sidebar_div" style={{backgroundColor:`${background}`,color:`${color}`}}>
            <p>
              <MdSubscriptions size={22} className='icon_sidebar' style={{ margin: "auto 0.7rem" }} />
              <div className="text_sidebar_icon">Subscriptions</div>
            </p>
          </div>
        </div>
        <div className="libraryBtn_Drawerleftsidebar">
          <NavLink to={'/Library'} className="icon_sidebar_div" style={{backgroundColor:`${background}`,color:`${color}`}}>
            <p>
              <MdOutlineVideoLibrary size={22} className='icon_sidebar' style={{ margin: "auto 0.7rem" }} />
              <div className="text_sidebar_icon">Library</div>
            </p>
          </NavLink>
          <NavLink to={'/Watchhistory'} className="icon_sidebar_div" style={{backgroundColor:`${background}`,color:`${color}`}}>
            <p>
              <FaHistory size={22} className='icon_sidebar' style={{ margin: "auto 0.7rem" }} />
              <div className="text_sidebar_icon">History</div>
            </p>
          </NavLink>
          <NavLink to={'/Yourvideo'} className="icon_sidebar_div" style={{backgroundColor:`${background}`,color:`${color}`}}>
            <p>
              <AiFillPlaySquare size={22} className='icon_sidebar' style={{ margin: "auto 0.7rem" }} />
              <div className="text_sidebar_icon">Your Videos</div>
            </p>
          </NavLink>
          <NavLink to={'/Watchlater'} className="icon_sidebar_div" style={{backgroundColor:`${background}`,color:`${color}`}}>
            <p>
              <MdOutlineWatchLater
                size={22}
                className={"icon_sidebar"}
                style={{ margin: "auto 0.7rem" }}
              />
              <div className="text_sidebar_icon">Watch Later</div>
            </p>
          </NavLink>
          <NavLink to={'/Likedvideo'} className="icon_sidebar_div" style={{backgroundColor:`${background}`,color:`${color}`}}>
            <p>
              <AiFillLike size={22} className='icon_sidebar' style={{ margin: "auto 0.7rem" }} />
              <div className="text_sidebar_icon">Liked Videos</div>
            </p>
          </NavLink>
          <NavLink to={'/downloads'} className="icon_sidebar_div" style={{backgroundColor:`${background}`,color:`${color}`}}>
            <p>
              <RiDownload2Line size={22} className='icon_sidebar' style={{ margin: "auto 0.7rem" }} />
              <div className="text_sidebar_icon">Downloads</div>
            </p>
          </NavLink>
        </div>
        <div className="subScriptions_lsdbar" style={{color:`${color}`}}>
          <h3>Your Subscription</h3>
          <div className="chanel_lsdbar">
            <p>C</p>
            <div>Chanel</div>
          </div>
          <div className="chanel_lsdbar">
            <p>C</p>
            <div>Chanel</div>
          </div>
          <div className="chanel_lsdbar">
            <p>C</p>
            <div>Chanel</div>
          </div>
          <div className="chanel_lsdbar">
            <p>C</p>
            <div>Chanel</div>
          </div>
        </div>
      </div>
      <div className="container3_DrawaerLeftSidebar" onClick={() => toggledraw()}></div>
    </div>
  )
}

export default Drawersliderbar