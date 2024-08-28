import axios from "axios";
import {useState, useEffect} from "react";
import { CommentBoxTextarea } from "./CommentBox";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { jwtDecode } from "jwt-decode";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
const customStyleTomorrow = { ...tomorrow, 'pre[class*="language-"]': { ...tomorrow['pre[class*="language-"]'], backgroundColor: '#000622', margin: '0px' } };
const customAtomOneDark = { ...atomOneDark, hljs: { ...atomOneDark.hljs, backgroundColor: 'black' } };
const mystyle = {
    lineHeight: '1.5rem',
    fontFamily: 'sans-sarif',
    fontSize: '1rem',
}



export const Particularposts = (props) =>{
    const [reply, setReply] = useState("");
    const postId = props.id;
    const name = props.name;
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
    const [state, setState] = useState(false);
    
    function ChangeState(){
        setState((prev)=>!prev);
    }
    useEffect(() =>{
        async function fetchMyApi(){
        await axios.get("http://13.61.13.191:8080/api/v1/post/getpost/"+postId)
        .then(response => {
            setPost(response.data.post)
            setComments(response.data.comment)
        })
    }
    fetchMyApi()
    }, [state])
    return <div className="m-8">
        <div className="bg-slate-100 flex justify-between w-[52rem] mt-10 ml-8 shadow-lg h-16">
        <div className="  pl-6 pt-3 text-2xl font-semibold  italic ">
            The Question
        </div>
        <div className="pr-2 pt-8">
        <button  onClick={(e) =>{
                e.persist();
                navigate("/askquestion?name="+name)
            }} className="cursor-pointer transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Ask Question</button>
        </div>
    </div>
    <div className="w-[52rem] h-screen mt-8 ml-8 p-4">
        <div className="">
            <div className="font-serif font-semibold text-2xl">Question~</div>
        <div style={mystyle} className="text-xl h-auto"><SyntaxHighlighter language="jsx" style={customStyleTomorrow}
                            lineProps={{ style: { whiteSpace: 'pre-wrap' } }}
                            wrapLines={true} >

                          
                            
                          {post.title}


                        </SyntaxHighlighter></div>
        <div className="font-serif font-semibold text-2xl mt-2">Solution ~</div>
        <div style={mystyle} className="shadow-lg  p-3 ">
        
        
        <SyntaxHighlighter language="javascript" style={customAtomOneDark}>
                            {post.description}
                        </SyntaxHighlighter>

</div>
        <div className="flex">
        
        {post.Tags?.map(tag => <Tag title = {tag} />)}
        
      </div>
      </div>
      <div className="flex justify-end">
        <div className="mr-10"> <EditButton postId={postId} userId= {post.userId}/></div>
      <div className="bg-blue-900 rounded-lg" >
        <div className="flex justify-end pr-8 mr-4 text-white">posted by</div>
        
        <div className="flex justify-end pr-8 mr-4 text-white">{name}</div>
      </div>
      </div>
      <div>
      {comments?.map(comment => <Comment key = {comment._id} commentId={comment._id} description = {comment.description} user = {comment.firstName} userID = {comment.userId} ChangeState={ChangeState}/>)}
      </div>
      <div>
        
        <CommentBoxTextarea onChange={e =>{
            setReply(e.target.value);
        }}/>
        <div className="flex justify-end mr-12"><button onClick={async () =>{
            const response = await axios.post("http://13.61.13.191:8080/api/v1/post/comment/"+postId , {
                description: reply
            },{
                headers:{
                    Authorization: "Bearer "+localStorage.getItem("token")
                }
            }
        );
        
        ChangeState();
        }} className="rounded-lg bg-blue-900 tracking-wider text-white w-[4rem] border-2 border-transparent active:border-blue-300 duration-300 active:text-white">Post</button></div>
        
      </div>
    </div>
    </div>
}

function EditButton(props){
    const navigate = useNavigate();
    const jwt = localStorage.getItem("token");
    const decoded = jwtDecode(jwt);
    const userID = decoded.userId;
    if(userID == props.userId){
        return <div>
            <Button onClick={(e)=>{
                e.persist();
                navigate("/editQuestion?postId="+props.postId)
            }} label={"Edit"} />
        </div>
    }
}

function Tag({title}){
    
    return  <div className="bg-blue-900 rounded-lg text-white text-xl pr-1 pl-1 mr-2 cursor-pointer shadow-lg  ">
    {title}
</div>
}
function Comment({commentId,description, user, userID, ChangeState}){
   return <div className="m-8 mr-8 pl-6 h-auto   ">
    <div ><SyntaxHighlighter language="javascript" style={customAtomOneDark}>
                            {description}
                        </SyntaxHighlighter></div>
    <div className="flex justify-end" >
        <div className="mr-2 mt-1"><EditComment commentId={commentId} description={description} user={user} userID={userID} ChangeState={ChangeState}/></div>
        <div className="bg-blue-900 mt-1 rounded-lg h-[3rem]">
        <div className="flex justify-end  pr-8 text-white">replied by</div>
        <div className="flex justify-end  pr-8 text-white" >{user}</div></div>
        </div> 
   
   </div>

    
}
function EditComment(props){
    const[isOpen, setIsOpen] = useState(false);
    const jwt = localStorage.getItem("token");
    const decoded = jwtDecode(jwt);
    const userId = decoded.userId;
    const [reply, setReply] = useState(props.description);
    if(props.userID == userId){
    return <div>
          <Button onClick={(e)=>{
            e.persist();
            setIsOpen((prev)=>!prev);
          }} label={"edit"}/>
          {isOpen && (
            <div>
                <CommentBoxTextarea onChange={e =>{
            setReply(e.target.value);
        }}  desc={props.description}/>
        <div className="flex justify-end mr-12"><button onClick={async () =>{
            const response = await axios.put("http://13.61.13.191:8080/api/v1/post/comment/update/"+props.commentId , {
                description: reply
            },{
                headers:{
                    Authorization: "Bearer "+localStorage.getItem("token")
                }
            }
        );
        setIsOpen((prev)=>!prev);
        props.ChangeState();
        }} className="rounded-lg bg-blue-900 w-[4rem] text-white tracking-wider border-2 border-transparent active:border-blue-300 duration-300 active:text-white">Post</button></div>
            </div>
          )}
    </div>
    }
}