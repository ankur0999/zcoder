import { Topbar } from "../components/Topbar";
import { Index } from "../components/Index";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { ParticularDiscussion } from "../components/ParticularDiscussion";
import { useNavigate } from "react-router-dom";


export const DiscussionBox = () => {
    
    const [searchParams] = useSearchParams();
    const discussionId = searchParams.get("id");
    const name = searchParams.get("name");
    const [title, setTitle] = useState("");
    const [discussions, setDiscussions] = useState([]);
    const [count, setCount] = useState(0);
    const topbar = useMemo(()=><Topbar/>,[]);
    const index = useMemo(()=><Index/>,[]);
    
    useEffect(()=>{
        async function fetchMyApi(){
        await axios.get("http://13.61.13.191:8080/api/v1/user/discussions",{
            headers:{
                Authorization : "Bearer "+localStorage.getItem("token")
            }
        })
        .then(response=>{
              setDiscussions(response.data.discussions)
        })}
        fetchMyApi()
    },[count])
    
    return <div className="bg-slate-50">
    {topbar}
    
    <div className=" h-auto flex ">
        <div className="min-w-52 max-w-52">
        {index}
        </div>
        
        <div className="m-8 w-[18rem]">
            <div>
           <div className="ml-4 shadow-lg p-4 bg-slate-200">
           <InputBox onChange={e =>{
          setTitle(e.target.value);
        }} placeholder="Discussion 1" label={"Discussion Name"} />
        <div className="pt-4">
        <Button onClick={async () => {
            const response = await axios.post("http://13.61.13.191:8080/api/v1/user/discussion", {
              title
            },{
                headers:{
                    Authorization: "Bearer "+ localStorage.getItem("token")
                }
            });
            setCount(count+1);
            
          }} label={"Create Discussion"} /></div>
           </div>
        </div>
        <div>
            <div className="ml-4 mt-8 shadow-lg p-4 bg-slate-200 ">
            <div className=" font-semibold text-xl">Your Current Discussions~</div>
            <div className="pt-4">
              {discussions?.map(discussion => <ShowDiscussion discussion = {discussion}/>)}
            </div>
        </div>
        </div>
        
        
        
    </div>
    <div className="m-10"><ParticularDiscussion discussionId = {discussionId} name = {name}/></div>
</div>
</div>
function ShowDiscussion({discussion}){
    const navigate = useNavigate();
    
    return <div>
         <div className="pt-4">
        <Button onClick={(e)=>{
            e.persist();
            navigate('/discussionbox?id='+discussion._id+'&name='+discussion.title)
        }} label={discussion.title} /></div>
    </div>
}
}

