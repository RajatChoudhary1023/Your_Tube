import React, { useState,useEffect } from 'react'
import './Videoupload.css'
import { buildStyles, CircularProgressbar } from "react-circular-progressbar"
import { useSelector, useDispatch } from 'react-redux'
import { uploadvideo } from '../../action/video'
import gettime from '../../action/timeandloc'
import checkIfSouthIndia from '../../action/location'
const Videoupload = ({ setvideouploadpage }) => {
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

    const [title, settitle] = useState("")
    const [videofile, setvideofile] = useState("")
    const [progress, setprogress] = useState(0)
    const dispatch = useDispatch()
    const handlesetvideofile = (e) => {
        setvideofile(e.target.files[0])
    }
    const currentuser = useSelector(state => state.currentuserreducer);
    const fileoption = {
        onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setprogress(percentage)
            if (percentage === 100) {
                setTimeout(function () { }, 3000);
                setvideouploadpage(false)
            }
        },
    };
    const uploadvideofile = () => {
        if (!title) {
            alert("plz enter a title of the video")
        } else if (!videofile) {
            alert("plz attach a video file");
        } else {
            const filedata = new FormData()
            filedata.append("file", videofile)
            filedata.append("title", title)
            filedata.append("chanel", currentuser?.result?._id)
            filedata.append("uploader", currentuser?.result.name)
            // console.log(videofile)
            dispatch(uploadvideo({ filedata: filedata, fileoption: fileoption }))
        }
    }
    return (
        <div className="container_VidUpload">
            <input type="submit" name='text' value={"X"} onClick={() => setvideouploadpage(false)} className="ibtn_x" />
            <div className="container2_VidUpload" style={{backgroundColor:`${background}`,color:`${color}`}}>
                <div className="ibox_div_vidupload">
                    <input type="text" maxLength={30} placeholder='Enter title of your video' className="ibox_vidupload" style={{color:`${color}`}} onChange={(e) => {
                        settitle(e.target.value);
                    }} />
                    <label htmlFor="file" className='ibox_cidupload btn_vidUpload'>
                        <input type="file" name='file' style={{ fontSize: "1rem" }} onChange={(e) => { handlesetvideofile(e) }} className="ibox_vidupload" />
                    </label>
                </div>
                <div className="ibox_div_vidupload">
                    <input type="submit" onClick={() => uploadvideofile()} value={"Upload"} className='ibox_vidupload btn_vidUpload' />
                    <div className="loader ibox_div_vidupload">
                        <CircularProgressbar
                            value={progress}
                            text={`${progress}`}
                            styles={buildStyles({
                                rotation: 0.25,
                                strokeLinecap: "butt",
                                textSize: "20px",
                                pathTransitionDuration: 0.5,
                                pathColor: `rgba(255,255,255,${progress / 100})`,
                                textColor: "#f88",
                                trailColor: "#adff2f",
                                backgroundColor: "#3e98c7",
                            })}

                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Videoupload