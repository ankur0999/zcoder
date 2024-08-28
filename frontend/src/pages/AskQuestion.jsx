import { useState, useMemo } from "react";
import { Textarea } from "@material-tailwind/react";
import { Topbar } from "../components/Topbar";
import { Index } from "../components/Index";
import { Button } from "@material-tailwind/react";
import axios from "axios"



export const AskQuestion = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [Tags, setTags] = useState([]);
    const [tag, setTag] = useState("");
    const topbar = useMemo(()=><Topbar/>,[]);
    const index = useMemo(()=><Index/>,[]);
    
    const data = {
        title: title,
        description: description,
        Tags: Tags
    }

    const filteredData = Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== null && value !== '' && value !== undefined)
      );

    function addTags(){
        
        setTags([...Tags, tag])
        console.log(Tags)
    }
    
    return <div className="bg-slate-50">
    {topbar}
    
    <div className=" h-auto flex ">
        <div className="min-w-52 max-w-52">
        {index}
        </div>
        
        <div className="m-8 p-6">
        <div className="flex w-96 flex-col gap-6">
        <Textarea onChange={e=>{
            setTitle(e.target.value);
        }} className="w-[32rem]" size="lg" label="Question" rows={3} />
        <Textarea  onChange={e=>{
            setDescription(e.target.value);
        }}  className="w-[40rem]" size="md" label="Solution" rows={8} />
        <div>
        <input onChange={e=>{
            setTag(e.target.value)
        }} className="p-2" placeholder="tag"></input>
        <button onClick={addTags} className="p-2 bg-blue-900 rounded-lg text-white">add Tag</button>
        </div>
        <div className="w-32" ><Button onClick={()=>{
            
            axios.post("http://13.61.13.191:8080/api/v1/post/post",filteredData,{
                headers:{
                    Authorization: "Bearer "+ localStorage.getItem("token")
                }
            })
            alert("Post uploaded successfully!")
        
        }} fullWidth varient="outlined" size="lg" color="blue" >Post</Button></div>
        
    </div>
        </div>
    </div>
</div>
}