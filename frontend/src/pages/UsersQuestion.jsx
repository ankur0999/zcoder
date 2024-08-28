import { Topbar } from "../components/Topbar";
import { Index } from "../components/Index";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect,useState, useMemo } from "react";
import axios from "axios";



export const UsersQuestion = () =>{
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("id");
    
    const [feeds, setFeeds] = useState([]);
    const topbar = useMemo(()=><Topbar/>,[]);
    const index = useMemo(()=><Index/>,[]);
    const [state, setState] = useState(false);
    function ChangeState(){
        setState((prev)=>!prev)
    }
    
   

    useEffect(()=>{
        async function fetchMyApi(){
         await axios.get("http://localhost:3000/api/v1/post/feeds/"+userId)
        .then(response=>{
            setFeeds(response.data.feeds)
        })
        }
        fetchMyApi()
    },[state])

    return <div className="bg-slate-50">
             {topbar}
             <div className=" h-auto flex ">
            <div className="min-w-52 max-w-52">
            {index}
            </div>
            
            <div>
            {feeds?.slice(0).reverse().map(feed => <Feed key = {feed._id} feed = {feed} ChangeState={ChangeState}/>)}
            </div>
         </div>
    </div>




}

function Feed({feed,ChangeState}){
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    useEffect( () => {
        axios.get("http://localhost:3000/api/v1/user/getuser/"+feed.userId)
        .then(response => {
            setUser(response.data.user)
        })
    },[])
    return <div className="m-8">
        <div className="h-20 shadow-lg p-2 m-4 w-[52rem] bg-blue-900 rounded-lg">
            <div className="flex justify-between">
            <div className="font-semibold h-10 cursor-pointer text-white">
                <button onClick={(e)=>{
                    navigate("/post?id="+feed._id + "&name="+ user)
                }} >
                {feed.title}</button>
                </div>
                <div>
                    <CheckPublic feed = {feed} ChangeState={ChangeState}/>
                </div>
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
    return <div className="pr-1 pl-1 mr-2 cursor-pointer shadow-lg text-white rounded-lg bg-blue-400 ">
        {title}
    </div>
}

function CheckPublic({feed,ChangeState}){
    
    if(feed.public === true){
    return <div className="flex">
    <div className="mr-2 text-white">public</div>
    <div className="shadow-xl bg-slate-400 rounded-md"><button onClick={(e)=>{
        e.persist()
        changeVisibilty({feed,ChangeState})}}>
            private</button></div>
</div>
    }
    else if(feed.public === false){
        return <div className="flex">
            <div className="mr-2 text-white">private</div>
            <div className="shadow-xl bg-slate-400 rounded-md"><button onClick={(e)=>{
        e.persist()
        changeVisibilty({feed,ChangeState})}}>public</button></div>
        </div>
    }
}

async function changeVisibilty({feed,ChangeState}){
    
    await axios.put("http://localhost:3000/api/v1/post/update/"+feed._id,{
            public: !feed.public
        },{
            headers:{
                Authorization: "Bearer "+localStorage.getItem("token")
            }
        })
    ChangeState();
    
}
        
    
    
