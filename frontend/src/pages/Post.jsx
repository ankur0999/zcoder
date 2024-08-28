import { Topbar } from "../components/Topbar"
import { Particularposts  } from "../components/Particularpost";
import { Index } from "../components/Index";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

export const Post = () =>{
    const topbar = useMemo(()=><Topbar/>,[]);
    const index = useMemo(()=><Index/>,[]);
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    return <div >
        {topbar}

        
        <div className=" h-auto flex ">
            <div className="min-w-52 max-w-52">
            {index}
            </div>
            
            <div>
            <Particularposts id={id} name = {name} />
            </div>
            
            
            
        </div>
    </div>
}