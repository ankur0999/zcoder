import { Topbar } from "../components/Topbar";
import { Index } from "../components/Index";
import img from "../images/userlogo.jpg";
import { GetQuestion } from "../components/GetQuestion";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export const Profile = () =>{
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const jwt = localStorage.getItem("token");
    const decoded = jwtDecode(jwt);
    const userId = decoded.userId;
    const topbar = useMemo(()=><Topbar/>,[]);
    const index = useMemo(()=><Index/>,[]);
    const [profile, setProfile] = useState([])
    
     
        
     
    
    useEffect(()=>{
        async function fetchMyApi(){
         await axios.get("http://localhost:3000/api/v1/user/getuser/"+id)
        .then(response=>{
            setProfile(response.data.profile)
        })
        }
        fetchMyApi()
        
    },[])
    
    return <div className="bg-slate-50">
    {topbar}
        
    <div className=" h-auto flex ">
        <div className="min-w-52 max-w-52">
        {index}
        </div>
        <div className="flex m-8 "> 
            <div>
            <div className="flex w-[17rem] p-2 bg-slate-100 shadow-lg">
                <div><img className="w-[60rem]" src={img} alt="" /></div>
                <div>
                <div className="flex ">
                <div className="ml-2 mt-5">{profile.firstName} </div>
                <div className="mt-5 ml-1">{profile.lastName}</div>
                </div>
                <div className="ml-1">{profile.username}</div>
                <Gender prop = {profile.gender} />
                
                </div>
            </div>
            <div>
            <Button disabled={userId != id} onClick={(e)=>{
                e.persist();
                navigate("/editprofile?id="+id+"&name="+profile.firstName)
            }} label={"Edit Profile"}/>
            </div>
            <div className="flex justify-center">
            <div className="mt-2">    
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
            </svg></div>
            <div className="m-1">{profile.location}</div>
            </div>
            <div>
                <div className="text-2xl font-serif mb-1">About Me</div>
                <div >{profile.summary}</div>
            </div>
            <Website url={profile.website} />
            <Github url={profile.github} />
            <Linkedin url={profile.linkedin} />
            <Twitter url={profile.twitter}/>
            <div className="ml-2 mt-2 text-xl font-semibold font-serif">Education</div>
            <div className="ml-4">{profile.education}</div>
            <div className="ml-2 mt-2 text-xl font-semibold font-serif">Skills</div>
            <div>{profile.skills?.map(skill => <Skill skill={skill} />)}</div>
            
            
            
            </div>
            <div className="m-8 w-[42rem]">
            <div className="ml-2 mt-2 pt-4 pl-4 h-16 text-xl shadow-lg font-semibold font-serif">Qustions asked by {profile.firstName} ~</div>
            
            <div><GetQuestion  userId ={id} /></div>
            </div>

        </div>
        </div>
        </div>
}

function Button({label, onClick, disabled}) {
    return <button disabled={disabled} onClick={onClick} type="button" className=" w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{label}</button>
} 

function Skill({skill}){
    return <div className="ml-4">
        {skill}
    </div>
}

function Website({url}){
    if(url){
        return <div className="flex mt-4">
            <div className="ml-4 mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-broadcast" viewBox="0 0 16 16">
  <path d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707m2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708m5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708m2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0"/>
</svg></div>
<div className="ml-2 mt-3">
            <a href={url}>Website</a></div>
        </div>
       
    }
}

function Github({url}){
    if(url){
        return <div className="flex">
           <div className="ml-4 mt-4">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
</svg>
            </div> 
            <div className="ml-2 mt-3">
            <a href={url}>Github</a></div>
        </div>

    }
}

function Linkedin({url}){
    if(url){
        return <div className="flex">
           <div className="ml-4 mt-4">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
</svg>
            </div> 
            <div className="ml-2 mt-3">
            <a href={url}>Linkedin</a></div>
        </div>

    }
}

function Twitter({url}){
    if(url){
        return <div className="flex">
           <div className="ml-4 mt-4">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter-x" viewBox="0 0 16 16">
  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
</svg>
            </div> 
            <div className="ml-2 mt-3">
            <a href={url}>Twitter</a></div>
        </div>

    }
}

function Gender({prop}){
    if(prop == 'Male'){
        return<div className="flex mt-4 ml-2">
            <div className="mr-1 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gender-male" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8"/>
</svg></div>
<div >Male</div>
        </div>
    }
    else if(prop == 'Female'){
        return <div className="flex mt-4 ml-2">
            <div className="mr-1 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gender-female" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8M3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5"/>
</svg></div>
<div >Female</div>
        </div>
    }
    else{
     return <div></div>
    }
}



