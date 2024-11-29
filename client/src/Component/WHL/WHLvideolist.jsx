import React,{useState,useEffect} from 'react'
import Showvideolist from '../Showvideolist/Showvideolist'
import gettime from '../../action/timeandloc';
import checkIfSouthIndia from '../../action/location';
const WHLvideolist = ({ page, currentuser, videolist }) => {
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
    // console.log(currentuser)
    return (
        <>
            {currentuser ? (
                <>
                    {
                        videolist?.data.filter(q => q?.viewer === currentuser).reverse().map(m => {
                            console.log(m)
                            return (
                                <>
                                    <Showvideolist videoid={m?.videoid} key={m?._id}/>
                                </>
                            )
                        })
                    }

                </>
            ) : (
                <>

                    <h2 style={{ color:`${color}`}}>Plz login to Watch your {page}</h2>
                </>
            )}
        </>
    )
}

export default WHLvideolist