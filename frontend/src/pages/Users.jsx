import { Topbar } from "../components/Topbar";
import { Index } from "../components/Index";
import { SearchUser } from "../components/SearchUser";
import { useMemo } from "react";
export const Users = () =>{
    const topbar = useMemo(()=><Topbar/>,[]);
    const index = useMemo(()=><Index/>,[]);
    return <div className="bg-slate-50">
        {topbar}
        
        <div className=" h-auto flex ">
            <div className="min-w-52 max-w-52">
            {index}
            </div>
            
            <div>
               <SearchUser />
            </div>
            
            
            
        </div>
    </div>
}