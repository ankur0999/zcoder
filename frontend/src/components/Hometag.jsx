import { useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { useState, useEffect } from "react";


export const Home = () =>{
    const jwt = localStorage.getItem('token');
    const decoded = jwtDecode(jwt);
    const userId = decoded.userId;
    
    const [user, setUser] = useState("");

    useEffect( () =>{
        axios.get("http://localhost:3000/api/v1/user/getuser/"+userId)
       .then(response => {
           setUser(response.data.user)
       })
   }, [])

    const navigate = useNavigate();
    return <div className="flex hover:bg-blue-900 mr-6 rounded-lg">
        <div className="flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 12.148l-1.361 1.465-10.639-9.883-10.639 9.868-1.361-1.465 12-11.133 12 11.148zm-4 1.749l-2 10.103h-12l-2-10.103 8-7.444 8 7.444zm-7 6.103c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm1-5c0-1.105-.896-2-2-2s-2 .895-2 2 .896 2 2 2 2-.895 2-2z"/></svg>
        </div>
        <div className="px-1 font-bold flex justify-center">
            <button onClick={(e)=>{
                e.persist();
                navigate("/home?name="+user)
            } }className="rounded-lg tracking-wider border-2 border-transparent active:border-blue-300 duration-300 active:text-white">Home</button></div>
    </div>
    
}