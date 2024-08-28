import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export const Feed = ({feed}) =>{
    
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    useEffect( () => {
        axios.get("http://13.61.13.191:8080/api/v1/user/getuser/"+feed.userId)
        .then(response => {
            setUser(response.data.user)
        })
    })
    
    return <div className="m-8 ">
        <div className="h-20 shadow-lg p-2 m-4 text-white bg-blue-900 rounded-lg">
            <div className="font-semibold h-10  text-white">
                <button onClick={(e)=>{
                    navigate("/post?id="+feed._id + "&name="+ user)
                }} >
                {feed.title}</button>
                </div>
        
        <div className="flex justify-between">
            <div className="flex ">
                {feed.Tags?.map(tag => <Tag  title = {tag} />)}
            </div>
            <div className="flex">
                <div className="rounded-full bg-slate-300 w-6 flex justify-center mr-2 pb-1">
                    <div>{user[0]}</div></div>
                
                <div>{user}</div>
                
            </div>
        </div>
        </div>
        

        
    </div>
}

function Tag({title}){
    return <div className="pr-1 pl-1 mr-2 cursor-pointer shadow-lg bg-blue-400 rounded-lg">
        {title}
    </div>
}