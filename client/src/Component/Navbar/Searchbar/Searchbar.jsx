import React, { useState,useEffect } from 'react'
import "./Searchbar.css"
import { BsMicFill } from "react-icons/bs"
import { FaSearch } from "react-icons/fa"
import Searchlist from './Searchlist'
import gettime from '../../../action/timeandloc'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import checkIfSouthIndia from '../../../action/location'
const Searchbar = () => {
    const [isSouthIndia, setIsSouthIndia] = useState(null);
    useEffect(() => {
        checkIfSouthIndia().then(result => {
            setIsSouthIndia(result); 
            console.log(result); // Logs 1 if in South India, 0 if not
        });
    }, []);
    const time=gettime();
    const [background,setBackground]=useState('rgb(18, 18, 18);');
    const [color,setColor]=useState('whitesmoke');
    const [background1,setBackground1]=useState('whitesmoke');
    const [color1,setColor1]=useState('rgb(78, 78, 78)')

    const [Searchquery, setsearchquery] = useState("")
    const [searchlist, setsearchlist] = useState(false)
    const Titlearray=useSelector(s=>s?.videoreducer)?.data?.filter(q=>q?.videotitle.toUpperCase().includes(Searchquery?.toUpperCase())).map(m=>m?.videotitle)
    // const Titlearray = ["video1", "video2", "animation video", "Movies"].filter(q => q.toUpperCase().includes(Searchquery.toUpperCase()))

    useEffect(()=> {
        if (time>=10 && time<12 && isSouthIndia===1) {
            setBackground('whitesmoke');
            setColor('rgb(18, 18, 18)');
            setBackground1('rgb(78, 78, 78)');
            setColor1('whitesmoke');
        }
       },[time,isSouthIndia])
    
    return (
        <>
            <div className="SearchBar_Container">
                <div className="SearchBar_Container2">
                    <div className="search_div">
                        <input type="text" className='iBox_SearchBar' placeholder='Search' onChange={e => setsearchquery(e.target.value)} value={Searchquery} onClick={e=>setsearchlist(true)} style={{backgroundColor:`${background}`,color:`${color}`}} />
                        <Link to={`/search/${Searchquery}`}> 
                        <FaSearch className="searchIcon_SearchBar" style={{backgroundColor:`${background}`,color:`${color}`}}/>
                        </Link>
                        <BsMicFill className='Mic_SearchBar' style={{backgroundColor:`${background}`,color:`${color}`}}/>
                        {Searchquery && searchlist && 
                        <Searchlist setsearchquery={setsearchquery} Titlearray={Titlearray}/>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Searchbar