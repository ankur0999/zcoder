import { Topbar } from "../components/Topbar";
import { Index } from "../components/Index";
import { Posts } from "../components/Posts";
import { useMemo } from "react"; 
export const Home = () =>{
    const topbar = useMemo(()=><Topbar/>,[]);
    const index = useMemo(()=><Index/>,[]);
    return <div className="bg-slate-50">
        {topbar}
        
        <div className=" h-auto flex ">
            <div className="min-w-52 max-w-52">
            {index}
            </div>
            
            <div>
               <Posts />
            </div>
            
            
            
        </div>
    </div>
}