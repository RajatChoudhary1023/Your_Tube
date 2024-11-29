import React ,{ useEffect,useState } from 'react'
import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google';
import "./Auth.css"
import {useDispatch} from "react-redux"
import { setcurrentuser } from '../../action/currentuser';
import gettime from '../../action/timeandloc';
import checkIfSouthIndia from '../../action/location';
const Auth = ({ user, setauthbtn, seteditcreatechanelbtn }) => {
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
    const dispatch=useDispatch()
    const logout=()=>{
        dispatch(setcurrentuser(null))
        localStorage.clear()
        googleLogout()
    }
    
    
    return (
        <div className="Auth_container" onClick={() => setauthbtn(false)}>
            <div className="Auth_container2" style={{backgroundColor:`${background}`,color:`${color}`}}>
                <p className="User_Details">
                    <div className="Chanel_logo_App">
                        <p className="fstChar_logo_App">
                            {user?.result.name ? (
                                <>{user?.result.name.charAt(0).toUpperCase()}</>

                            ) : (
                                <>{user?.result.email.charAt(0).toUpperCase()}</>
                            )}
                        </p>
                    </div>
                    <div className="email_auth">{user?.result.email}</div>
                </p>
                <div className="btns_Auth">
                    {user?.result.name ?(
                        <>
                        {
                            <Link to={`/channel/${user?.result?._id}`} className='btn_Auth' style={{color:`${color}`}}>Your Channel</Link>
                        }
                        </>
                    ):(
                        <>
                            <input type="subnit" className='btn_Auth' value="Create Your Own Channel" onClick={()=>seteditcreatechanelbtn(true)}/>
                        </>
                    )}
                    <div>
                        <div className="btn_Auth" style={{color:`${color}`}} onClick={()=>logout()}>
                            <BiLogOut/>
                            Log Out
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth