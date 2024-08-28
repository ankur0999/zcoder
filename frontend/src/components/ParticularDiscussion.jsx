import { useEffect, useState } from "react"
import { Button } from "./Button"
import { InputBox } from "./InputBox"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { AiOutlineCaretUp, AiOutlineCaretDown} from "react-icons/ai";

export const ParticularDiscussion = ({discussionId,name}) =>{
    const navigate = useNavigate();
    const [comment, setComment] = useState([])
    const [text, setText] = useState("");
    const [state, setState] = useState(false);
   
    useEffect(()=>{
    async function fetchMyApi(){
        await axios.get("http://13.61.13.191:8080/api/v1/user/comment/"+discussionId)
        .then(response=>{
            setComment(response.data.comment)
        })
    }
    fetchMyApi() 
    },[discussionId,state])
    
    return <div className=" w-[48rem]">
        <div className="flex justify-between shadow-lg h-10">
        <div className="flex ">
        <div className=" text-xl pl-4 font-serif">{name}</div>
        <div className="ml-2"><button onClick={async()=>{
             await axios.put("http://13.61.13.191:8080/api/v1/user/delete/discussion/"+discussionId,{},{
                headers:{
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
             })
             
             navigate("/discussion");
        }} className=" bg-blue-900 text-white mb-1  pl-2 pr-2 font-bold text-lg rounded-lg tracking-wider border-2 border-transparent active:border-blue-300 duration-300 active:text-white">
            Pull
            </button></div>
        </div>
        <div className="flex">
        <div className="mr-5"><ShowUsers id={discussionId} /></div>   

        <div className="pr-2  "><Button onClick={(e)=>{
            e.persist()
            navigate("/searchusers?id1="+discussionId)
        }} label={"INVITE"}/></div>
        </div></div>
        <div className="m-8">
            <div>{comment?.map(comm => <ShowComment comment ={comm}/>)}</div>
            <div className="flex mt-10">
            <div className="w-[32rem] pl-2"><InputBox onChange={e =>{
                setText(e.target.value)
            }} placeholder={"do comment"}/></div>
            <div className="mt-3 ml-4"><Button onClick={async ()=>{
                await axios.post("http://13.61.13.191:8080/api/v1/user/comment/"+ discussionId,{
                    
                        description: text
                    },{
                        headers:{
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    })
                    
                        setState((prev)=>!prev);
                    
                 
                }
            } label={"Post"}/></div>
            </div>
        </div>
    </div>

}
function ShowUsers({id}){
    const [users, setUsers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(()=>{
        axios.get("http://13.61.13.191:8080/api/v1/user/getusers/discussion/"+id)
        .then(response=>{
              setUsers(response.data.user)
        })
    })
    
    return <div>
        <div className="relative flex flex-col items-center w-[6rem] rounded-lg">
            <button onClick={()=> setIsOpen((prev)=>!prev)} className= "  flex bg-blue-900 text-white mb-1 py-1 pl-2 pr-2 font-bold text-lg rounded-lg tracking-wider border-2 border-transparent active:border-blue-300 duration-300 active:text-white">
                Users
                {!isOpen ? (
                    <AiOutlineCaretDown className="h-6 ml-2 mt-1" />
                ):(
                    <AiOutlineCaretUp className="h-6 ml-2 mt-1" />
                )
            }
                </button>
                {isOpen && (
                    <div>
                         {users?.map(user=> <UsersList user={user} />)}
                    </div>
                )}
        </div>
        
    </div>
}
function UsersList({user}){
    return <div className="m-1 bg-slate-300 w-full p-1 rounded-lg">
           {user.firstName}
        </div>
}

function ShowComment({comment}){
    return <div className="">
        <div>{comment.description}</div>
        <div className="flex justify-end">{comment.firstName}</div>
    </div>
}