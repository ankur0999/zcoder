import { useNavigate } from "react-router-dom";

export const Contest = () => {
    const navigate = useNavigate();
    return <div className="flex hover:bg-blue-900 mr-6 rounded-lg">
        <div>
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M1 22h2v-22h18v22h2v2h-22v-2zm7-3v4h3v-4h-3zm5 0v4h3v-4h-3zm-6-5h-2v2h2v-2zm8 0h-2v2h2v-2zm-4 0h-2v2h2v-2zm8 0h-2v2h2v-2zm-12-4h-2v2h2v-2zm8 0h-2v2h2v-2zm-4 0h-2v2h2v-2zm8 0h-2v2h2v-2zm-12-4h-2v2h2v-2zm8 0h-2v2h2v-2zm-4 0h-2v2h2v-2zm8 0h-2v2h2v-2zm-12-4h-2v2h2v-2zm8 0h-2v2h2v-2zm-4 0h-2v2h2v-2zm8 0h-2v2h2v-2z"/></svg>
        </div>
        <div className="pl-2 text-lg">
        <button onClick={(e)=>{
            e.persist();
            navigate("/contestcalender")
        }}  className=" rounded-lg tracking-wider border-2 border-transparent active:border-blue-300 duration-300 active:text-white">Contest</button>    
        
        </div>

    </div>
}