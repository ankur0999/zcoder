import { Link } from "react-router-dom"
import { Home } from "./Hometag";
import { Questions } from "./Questions" ;
import { Tags } from "./Tags";
import { Saves } from "./Saves";
import { Users } from "./Users";
import { Contest } from "./Contest";
import { LABS } from "./Labs";
import { Jobs } from "./Jobs";
import { Discussion } from "./Discussion";
import { Teams } from "./Teams";


export const Index = () =>{
    return <div className="shadow h-auto mt-8 bg-slate-200 flex flex-col">
    <div className="pl-8 pt-7 cursor-pointer "><Home /></div>
    <div className="pl-8 pt-2 cursor-pointer"><Questions/> </div>
    <div className="pl-8 pt-2 cursor-pointer"><Tags /></div>
    <div className="pt-10"></div>
    <div className="pl-8 pt-2 cursor-pointer"><Saves/> </div>
    <div className="pl-8 pt-2 cursor-pointer"><Users/> </div>
    <div className="pl-8 pt-2 cursor-pointer"><Contest/> </div>
    <div className="pl-8 pt-12 "><LABS/> </div>
    <div className="pl-8 pt-2 cursor-pointer"><Jobs/> </div>
    <div className="pl-8 pt-2 cursor-pointer"><Discussion/> </div>
    <div className="pl-8 pt-12 "><Teams/> </div>
    <div className="pl-8 pr-2 pt-2 text-xs">Ask questions, find answers and collaborate at work with Zcoder for Teams. </div>
    <Link className="pointer underline pl-8 cursor-pointer text-sm" to={Users}>
        {"Explore Teams"}
      </Link>
    <div className="pl-8 pt-2 text-sm">Looking for your <Link className="pointer underline cursor-pointer ">Teams</Link>? </div>

    
    
    </div>
}