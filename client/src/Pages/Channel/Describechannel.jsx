import React,{useState,useEffect} from 'react'
import './Describechannel.css'
import {FaEdit,FaUpload} from "react-icons/fa"
import { useSelector } from 'react-redux'
import gettime from '../../action/timeandloc'
import checkIfSouthIndia from '../../action/location'
const Describechannel = ({setvideouploadpage,cid,seteditcreatechanelbtn}) => {
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
  // const channel=[
  //   {
  //       _id:1,
  //       name:"abcjabsc",
  //       email:"abcd@gmail.com",
  //       joinedon:"222-07-134",
  //       desc:"bithead"
  //   }
  // ]
const channel=useSelector(state=>state.chanelreducer)

const currentchannel=channel.filter((c)=>c._id=== cid)[0]
const currentuser=useSelector(state => state.currentuserreducer);
// console.log(currentchannel)
  return (
    <div className="container3_chanel" style={{color:`${color}`}}>
      <div className="chanel_logo_chanel">
        <b>{currentchannel?.name.charAt(0).toUpperCase()}</b>
      </div>
      <div className="description_chanel">
        <b>{currentchannel?.name}</b>
        <p>{currentchannel?.desc}</p>
      </div>
      {currentuser?.result._id === currentchannel?._id &&(
        <>
        <p className="editbtn_chanel" onClick={()=>seteditcreatechanelbtn(true)}>
          <FaEdit/>
          <b>Edit Channel</b>
        </p>
        <p className="uploadbtn_chanel" onClick={()=>setvideouploadpage(true)}>
          <FaUpload/>
          <b>Upload Video</b>
        </p>
        </>
      )}
    </div>
  )
}

export default Describechannel