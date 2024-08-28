import { useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";


export const Topbar = () => {
    const navigate = useNavigate();
    const jwt = localStorage.getItem('token');
    const decoded = jwtDecode(jwt);
    const userId = decoded.userId;
    
    const [user, setUser] = useState("");

    useEffect( () =>{
        axios.get("http://13.61.13.191:8080/api/v1/user/getuser/"+userId)
       .then(response => {
           setUser(response.data.user)
       })
   }, [userId])
    
    return <div className="shadow bg-fuchsia-50 pl-10 pr-8 min-w-[82rem] h-14 flex justify-between">
        
                    <div className="text-rose-800 flex flex-col  subpixel-antialiased font-semibold text-5xl italic font-sans justify-center h-full ml-4">
            Zcoder
        </div>
        
        <div className="flex ">
            <div><button onClick={(e)=>{
                e.persist();
                localStorage.removeItem('token');
                navigate('/signin');
            }} className="mr-4 mt-4 text-xl font-serif text-red-700">Logout</button></div>
            <div className="text-rose-950 flex flex-col justify-center h-full mr-4">
                {user}
            </div>
            <div onClick={(e)=>{
                        e.persist();
                        navigate("/profilepage?id="+userId+"&name="+user)
                    }}  className="rounded-full h-12 w-12 bg-rose-100 flex justify-center cursor-pointer mt-1 mr-2 hover:bg-blue-900">
                <div className="flex flex-col justify-center h-full text-xl ">
                    {user[0]}
                </div>
            </div>
        </div>
    </div>
}