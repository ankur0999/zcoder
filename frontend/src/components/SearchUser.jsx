import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { jwtDecode } from "jwt-decode";
import { useSearchParams } from "react-router-dom";

export const SearchUser = () =>{
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("")
    
    useEffect(() =>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter)
        .then(response =>{
            setUsers(response.data.user)
        })
    },[filter])
    return <div className="m-8">
        <div className="font-bold font-serif mt-6 ml-10 text-lg">
            Users
        </div>
        <div className="my-2 ml-10">
            <input onChange={(e) =>{
                setFilter(e.target.value)
            }} type ="text" placeholder="Search users..." className=" px-2 py-1 w-[36rem] border rounded border-slate-200"></input>

        </div>
        <div>
            {users.map(user => <User user = {user} />)}
        </div>

    </div>
}

function User({user}){
    const [searchParams] = useSearchParams();
    const discussionId = searchParams.get("id1");
    const jwt = localStorage.getItem("token");
    const decoded = jwtDecode(jwt);
    const userId = decoded.userId
    if(userId != user._id)
    return <div className="m-8 flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>


            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
            <Button onClick={async()=>{
                await axios.put("http://localhost:3000/api/v1/user/discussion/"+user._id+"/"+discussionId)
            }} label={"Invite"} />
        </div>
    </div>
}