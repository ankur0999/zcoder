import { useEffect, useState, useMemo } from "react"
import { Topbar } from "../components/Topbar"

import { Index } from "../components/Index";

export const ContestCalender = () =>{
    const [contest, setContest] = useState([]);
    let API = "https://codeforces.com/api/contest.list";
    const topbar = useMemo(()=><Topbar/>,[]);
    const index = useMemo(()=><Index/>,[]);
    const fetchApiData = async (url) =>{
        try{
            const res = await fetch(url)
            
            const data = await res.json();
            
            setContest(data.result);
            
        }catch(e){
            console.log(e);
        }
    };

    useEffect(()=>{
     fetchApiData(API);
    },[contest])
    return <div className="bg-slate-50 ">
       {topbar}
        
        <div className=" h-auto flex ">
            <div className="min-w-52 max-w-52">
            {index}
            </div>
            <div className="flex justify-between">
            <div>
                <div className="m-8 font-semibold font-serif text-2xl">Upcoming Contest</div>
                
            {contest?.map(cont => <ContestUP key = {cont.id} cont={cont} />)}
            </div>

            <div>
                <div className="m-8 font-semibold font-serif text-2xl">Finished Contest</div>
                
            {contest?.map(cont => <ContestFD key = {cont.id} cont={cont} />)}
            </div>
            </div>
        </div>
    </div>
}

function ContestUP({cont}){
    let unix_timestamp = cont.startTimeSeconds;
    var date = new Date(unix_timestamp*1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var dat = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var formattedTime = hours + ':' + minutes;
    var formattedDate = year+'/'+month+'/'+dat;
    var hour = Math.floor(cont.durationSeconds/3600);
    var rem = ((cont.durationSeconds%3600)/3600)*60;
    var length = hour+' : '+rem;
    

    if(cont.phase == 'BEFORE'){
        return <div className="shadow m-8 h-[10rem] w-[32rem] bg-slate-100 ">
            
        <div className="flex">
        <div className="m-4 text-lg font-semibold font-serif text-blue-800">{cont.name}</div>
        <div className="m-4">
        <div className="text-blue-900">start date</div>    
        <div className="text-red-800">{formattedDate}</div>
        <div className="text-red-800">{formattedTime}</div>
        </div>
        
        <div className="m-4">
        <div className="text-blue-900">Length</div>
        <div className="text-red-800">{length}</div>
        </div>
       </div>
     </div>
    }
}

function ContestFD({cont}){
    let unix_timestamp = cont.startTimeSeconds;
    var date = new Date(unix_timestamp*1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var dat = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var formattedTime = hours + ':' + minutes;
    var formattedDate = year+'/'+month+'/'+dat;
    var hour = Math.floor(cont.durationSeconds/3600);
    var rem = ((cont.durationSeconds%3600)/3600)*60;
    var length = hour+' : '+rem;
    

    if(cont.phase == 'FINISHED'){
        return <div className="shadow m-8 h-[10rem] w-[32rem] bg-slate-100 ">
            
        <div className="flex">
        <div className="m-4 text-lg font-semibold font-serif text-blue-800">{cont.name}</div>
        <div className="m-4">
        <div className="text-blue-900">start date</div>    
        <div className="text-red-800">{formattedDate}</div>
        <div className="text-red-800">{formattedTime}</div>
        </div>
        
        <div className="m-4">
        <div className="text-blue-900">Length</div>
        <div className="text-red-800">{length}</div>
        </div>
        </div>
    </div>
    }
}

