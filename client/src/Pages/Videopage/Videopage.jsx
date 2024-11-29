import React, { useEffect, useRef, useState } from 'react';
import "./Videopage.css";
import moment from 'moment';
import Likewatchlatersavebtns from './Likewatchlatersavebtns';
import { useParams, Link } from 'react-router-dom';
import Comment from '../../Component/Comment/Comment';
import { viewvideo } from '../../action/video';
import { addtohistory } from '../../action/history';
import { useSelector, useDispatch } from 'react-redux';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import Hls from 'hls.js';
import gettime from '../../action/timeandloc';
import checkIfSouthIndia from '../../action/location';
const Videopage = () => {
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

    const { vid } = useParams();
    const dispatch = useDispatch();
    const vids = useSelector((state) => state.videoreducer);
    const currentuser = useSelector(state => state.currentuserreducer);

    const vv = vids?.data.filter((q) => q._id === vid)[0];
   
    const videoRef = useRef(null);
    const [availableQualities, setAvailableQualities] = useState([]);
    const [currentQuality, setCurrentQuality] = useState(null);


    const handleviews = () => {
        dispatch(viewvideo({ id: vid }));
    };

    const handlehistory = () => {
        dispatch(addtohistory({
            videoid: vid,
            viewer: currentuser?.result._id,
        }));
    };

    useEffect(() => {
        if (currentuser) {
            handlehistory();
        }
        handleviews();
    }, [currentuser]);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement || !vv) return;
        
        const videoSrc = vv?.filepath; 

        const defaultOptions = {
        };

        if (Hls.isSupported() && videoSrc) {
            const hls = new Hls();
            hls.loadSource(`http://localhost:5000/${videoSrc}`);
            
            hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                const qualities = data.levels.map((level) => level.height); 
                setAvailableQualities(qualities);
                setCurrentQuality(qualities[0]); 


                defaultOptions.quality = {
                    default: qualities[0], 
                    options: qualities, 
                    forced: true,
                    onChange: (e) => updateQuality(e),
                };

                new Plyr(videoElement, defaultOptions);
            });

            hls.attachMedia(videoElement);
            window.hls = hls; 
        } else {

            new Plyr(videoElement, defaultOptions);
        }

        return () => {
            if (window.hls) {
                window.hls.destroy(); 
            }
        };
    }, [vv]);

    const updateQuality = (newQuality) => {
        if (window.hls) {
            const levelIndex = window.hls.levels.findIndex(
                (level) => level.height === newQuality
            );
            if (levelIndex !== -1) {
                window.hls.currentLevel = levelIndex; 
            }
        }
    };

    return (
        <>
            <div className="container_videoPage" style={{backgroundColor:`${background}`,color:`${color}`}}>
                <div className="container2_videoPage" >
                    <div className="video_display_screen_videoPage">
                        <video 
                            ref={videoRef} 
                            className="video_ShowVideo_videoPage" 
                            controls 
                            crossOrigin='true' 
                            autoPlay
                            playsInline
                        >
                            {/* If it's a normal mp4 file, we can directly load it */}
                            <source src={`http://localhost:5000/${vv?.filepath}`} type='video/mp4' />
                        </video>
                        <div className="video_details_videoPage">
                            <div className="video_btns_title_VideoPage_cont">
                                <p className="video_title_VideoPage">{vv?.title}</p>
                                <div className="views_date_btns_VideoPage">
                                    <div className="views_videoPage">
                                        {vv?.views} views <div className="dot"></div>{" "}
                                        {moment(vv?.createdat).fromNow()}
                                    </div>
                                    <Likewatchlatersavebtns vv={vv} vid={vid} />
                                </div>
                            </div>
                            <Link to={'/'} className='chanel_details_videoPage'>
                                <b className="chanel_logo_videoPage">
                                    <p>{vv?.uploader.charAt(0).toUpperCase()}</p>
                                </b>
                                <p className="chanel_name_videoPage" style={{color:`${color}`}}>{vv.uploader}</p>
                            </Link>
                            <div className="comments_VideoPage">
                                <h2>
                                    <u>Comments</u>
                                </h2>
                                <Comment videoid={vv._id} />
                            </div>
                        </div>
                    </div>
                    <div className="moreVideoBar">More videos</div>
                </div>
            </div>
        </>
    );
};

export default Videopage;
 