import {  useEffect, useState } from "react"
import axios from "axios"
import { Feed } from "./Feed"


export const GetQuestion = ({userId}) =>{
    
    const [feeds, setFeeds] = useState([])
    useEffect(()=>{
        async function fetchMyApi(){
         await axios.get("http://13.61.13.191:8080/api/v1/post/feeds/"+userId)
        .then(response=>{
            setFeeds(response.data.feeds)
        })
        }
        fetchMyApi()
    },[])
    
    return <div>
          {feeds?.slice(0).reverse().map(feed => <Feed key = {feed._id} feed = {feed} />)}
    </div>
}
