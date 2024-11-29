import React, { useState, useEffect } from 'react'
import logo from "./logo.ico"
import "./Navbar.css"
import { useDispatch, useSelector } from 'react-redux'
import { Link, generatePath } from "react-router-dom"
import { RiVideoAddLine } from "react-icons/ri"
import { IoMdNotificationsOutline } from "react-icons/io"
import { BiUserCircle } from "react-icons/bi"
import Searchbar from './Searchbar/Searchbar'
import Auth from '../../Pages/Auth/Auth'
import axios from "axios"
import { login } from "../../action/auth"
import { useGoogleLogin,googleLogout } from '@react-oauth/google';
import { setcurrentuser } from '../../action/currentuser';
import gettime from '../../action/timeandloc'
import {jwtDecode} from "jwt-decode"
import checkIfSouthIndia from '../../action/location'


const Navbar = ({ toggledrawer, seteditcreatechanelbtn }) => {
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
    const [border,setborder]=useState('#ccc');
    const [otpSent, setOtpSent] = useState(false);
    const [userOtp, setUserOtp] = useState('');
    const [serverOtp, setServerOtp] = useState('');
    const [authStep, setAuthStep] = useState('LOGIN');
    const [doneverify,setdoneverfy]=useState(false);
    const [authbtn, setauthbtn] = useState(false)
    const [user, setuser] = useState(null)
    const [profile, setprofile] = useState([])
    const dispatch = useDispatch()
   useEffect(()=> {
    if (time>=10 && time<12 && isSouthIndia===1) {
        setBackground('#fff');
        setColor('rgb(36,36,36)');
        setBackground1('rgb(36,36,36)');
        setColor1('#fff');
    }
   },[time,isSouthIndia])

    const currentuser = useSelector(state => state.currentuserreducer);
    // console.log(currentuser)
    // const successlogin = () => {
    //     if (profile.email) {
    //         dispatch(login({ email: profile.email }))
    //         console.log(profile.email)
    //     }
    // }

    const sendOtp = async (email) => {
        try {
            const response = await axios.post('http://localhost:5000/send-otp', { email });
            console.log(response.data.message); 
            setServerOtp(response.data.otp);
            setOtpSent(true); 
            setAuthStep('VERIFY_OTP');
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post('http://localhost:5000/verify-otp', {
                email: profile.email,
                otp: userOtp,
            });
    
            console.log(response.data.message); 

            setdoneverfy(true);
            dispatch(login({ email: profile.email }));

        } catch (error) {
            setborder('red');
            console.error('Error verifying OTP:', error.response?.data?.error || error.message);
        }
    };
    


    const successlogin =async () => {
        if (profile.email) {
            console.log("Attempting to log in with email:", profile.email);
            console.log("Sending OTP to:",profile.email);
            await sendOtp(profile.email);
        } else {
            console.error("No email found in profile.");
        }
    };
    

    // console.log(currentuser)
    // const currentuser={
    //     result:{
    //         _id:1,
    //         name:"abcjabsc",
    //         email:"abcd@gmail.com",
    //         joinedon:"222-07-134"
    //     }
    // }

    const google_login = useGoogleLogin({
        onSuccess: tokenResponse => setuser(tokenResponse),
        
        onError: (error) => console.log("Login Failed", error)
    });

    useEffect(
        () => {
            if (user) {
                axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                    .then((res) => {
                        setprofile(res.data)
                        successlogin()
                        // console.log(res.data)
                    })

            }
        },
        [user]
    );
    const logout=()=>{
        dispatch(setcurrentuser(null))
        googleLogout()
        localStorage.clear()
    }
    useEffect(()=>{
        const token=currentuser?.token;
        if(token){
            const decodetoken=jwtDecode(token)
            if(decodetoken.exp *1000 <new Date().getTime()){
                logout()
            }
        }
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))))
  },[currentuser?.token,dispatch]
)
    return (
        <>
            <div className="Container_Navbar" style={{backgroundColor:`${background}`,color:`${color}`}}>
                <div className="Burger_Logo_Navbar">
                    <div className="burger" onClick={() => toggledrawer()} >
                        <p style={{backgroundColor:`${background1}`}}></p>
                        <p style={{backgroundColor:`${background1}`}}></p>
                        <p style={{backgroundColor:`${background1}`}}></p>
                    </div>
                    <Link to={"/"} className='logo_div_Navbar'>
                        <img src={logo} alt="" />
                        <p className="logo_title_navbar" style={{color:`${color}`}}>Your-Tube</p>
                    </Link>
                </div>
                <Searchbar />
                <RiVideoAddLine size={22} className={"vid_bell_Navbar"} style={{color:`${color}`}} />
                <div className="apps_Box" >
                    <p className="appBox" style={{color:`${color}`}}></p>
                    <p className="appBox"style={{color:`${color}`}}></p>
                    <p className="appBox"style={{color:`${color}`}}></p>
                    <p className="appBox"style={{color:`${color}`}}></p>
                    <p className="appBox"style={{color:`${color}`}}></p>
                    <p className="appBox"style={{color:`${color}`}}></p>
                    <p className="appBox"style={{color:`${color}`}}></p>
                    <p className="appBox"style={{color:`${color}`}}></p>
                    <p className="appBox"style={{color:`${color}`}}></p>
                </div>

                <IoMdNotificationsOutline size={22} className={"vid_bell_Navbar"} style={{color:`${color}`}} />
                <div className="Auth_cont_Navbar">
                    {currentuser ? (
                        <>
                            <div className="Chanel_logo_App" onClick={() => setauthbtn(true)}>
                                <p className="fstChar_logo_App">
                                    {currentuser?.result.name ? (
                                        <>{currentuser?.result.name.charAt(0).toUpperCase()}</>

                                    ) : (
                                        <>{currentuser?.result.email.charAt(0).toUpperCase()}</>
                                    )}
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className='Auth_Btn' onClick={() => google_login()} style={{backgroundColor:`${background}`}}>
                                <BiUserCircle size={22} />
                                <b>Sign in</b>
                            </p>
                        </>
                    )}
                </div>
            </div>
            {authStep === 'VERIFY_OTP' && !doneverify && (
    <div className="otp-container">
        <div className="otp-backdrop"></div> 
        <div className="otp-verify">Enter OTP sent to email
            <input
                type="text"
                placeholder="Enter OTP"
                className="otpinput"
                style={{borderColor:`${border}`}}
                value={userOtp}
                onChange={(e) => setUserOtp(e.target.value)}
            />
            <button onClick={verifyOtp} className="otpbuton">Verify OTP</button>
        </div>
    </div>
)}

            {
                authbtn &&
                <Auth seteditcreatechanelbtn={seteditcreatechanelbtn} setauthbtn={setauthbtn} user={currentuser} />
            }
        </>
    )
}

export default Navbar


