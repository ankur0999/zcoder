import { useNavigate } from "react-router-dom";
export const Discussion = () => {
    const navigate = useNavigate();
    return <div className="flex hover:bg-blue-900 mr-6 rounded-lg">
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 6v16h-16v-16h16zm2-2h-20v20h20v-20zm-24-4v20h2v-18h18v-2h-20zm14 11h-6v-1h6v1zm0 1h-6v1h6v-1zm0 2h-6v1h6v-1zm0 2h-6v1h6v-1zm1-4l2.5 3 2.5-3h-5z"/></svg>

        </div>
        <div className="pl-2 text-lg">
              <button onClick={(e)=>{
                e.persist();
                navigate("/discussion");
              }}  className=" rounded-lg tracking-wider border-2 border-transparent active:border-blue-300 duration-300 active:text-white"> Discussion </button>
        </div>

    </div>
}