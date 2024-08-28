import { Feed } from "./Feed";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


export const Posts = () =>{
    const [feeds, setFeeds] = useState([]);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name");

    useEffect( () =>{
        axios.get("http://13.61.13.191:8080/api/v1/post/posts")
       .then(response => {
           setFeeds(response.data.Questions)
       })
   }, [])
    return <div className="m-8">
        
        <div className="bg-slate-100 flex justify-between w-[52rem] mt-10 ml-8 shadow-lg h-16">
        <div className="  pl-6 pt-3 text-2xl font-semibold  italic ">
            Top Question
        </div>
        <div className="pr-2 pt-8">
            <button  onClick={(e) =>{
                e.persist();
                navigate("/askquestion?name="+name)
            }} className="cursor-pointer transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">Ask Question</button>
            </div>
    </div>
    
    <div className="w-[52rem]">
       {feeds?.slice(0).reverse().map(feed => <Feed key = {feed._id} feed = {feed} />)} 
    </div>
    </div>  
}

