import { Topbar } from "../components/Topbar";
import { Index } from "../components/Index";
import Img  from "../images/userlogo.jpg"
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState,useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const EditProfile = () =>{
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [user, Setuser] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [education, setEducation] = useState("");
    const [github, setGithub] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [location, setLocation] = useState("");
    const [summary, setSummary] = useState("");
    const [twitter, setTwitter] = useState("");
    const [website, setWebsite] = useState("");
    const [gender, setGender] = useState("");
    const [skill, setSkill] = useState("");
    const [skills, setSkills] = useState([]);
    const topbar = useMemo(()=><Topbar/>,[]);
    const index = useMemo(()=><Index/>,[]);
    
    const data = {
      firstName: firstName,
      lastName: lastName,
      password: password,
      education: education,
      github: github,
      linkedin: linkedin,
      location: location,
      summary: summary,
      twitter: twitter,
      website: website,
      gender: gender,
      skills: skills,
      
    }
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value !== null && value !== '' && value !== undefined )
    );

    function addSkill(){
        setSkills([...skills, skill])
    }

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/getuser/"+id)
        .then(response=>{
            Setuser(response.data.profile)
        })
    },[])
    return<div className="bg-slate-50">
        {topbar}

        
        <div className=" h-auto flex ">
            <div className="min-w-52 max-w-52">
            {index}
            </div>
            <div className="m-8 pl-10 flex">
            <div className="flex w-[17rem] h-[10rem] p-2 bg-slate-100 shadow-lg">
                <div><img className="w-[60rem]" src={Img} alt="" /></div>
                <div>
                <div className="flex ">
                <div className="ml-2 mt-5">{user.firstName} </div>
                <div className="mt-5 ml-1">{user.lastName}</div>
                </div>
                <div className="ml-1">{user.username}</div>
                <Gender prop = {user.gender} />
                
                </div>
            </div>
           
 
     <div className="m-10 pl-10">
     <Card color="transparent" shadow={true}>
      <Typography variant="h4" color="blue-gray">
        Edit Profile
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            First Name
          </Typography>
          <Input
            onChange={e=>{
               setFirstName(e.target.value);
            }}
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Last Name
          </Typography>
          <Input
            onChange={e=>{
               setLastName(e.target.value);
            }}
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Password
          </Typography>
          <Input
            onChange={e=>{
               setPassword(e.target.value);
            }}
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Gender
          </Typography>
          <Input
            onChange={e=>{
               setGender(e.target.value);
            }}
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Education
          </Typography>
          <Input
            onChange={e=>{
               setEducation(e.target.value);
            }}
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Github id
          </Typography>
          <Input
            onChange={e=>{
               setGithub(e.target.value);
            }}
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Linkedin
          </Typography>
          <Input
            onChange={e=>{
               setLinkedin(e.target.value);
            }}
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Twitter
          </Typography>
          <Input
            onChange={e=>{
               setTwitter(e.target.value);
            }}
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Website
          </Typography>
          <Input
            onChange={e=>{
               setWebsite(e.target.value);
            }}
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Location
          </Typography>
          <Input
            onChange={e=>{
               setLocation(e.target.value);
            }}
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Write About Yourselves
          </Typography>
          <Input
            onChange={e=>{
               setSummary(e.target.value);
            }}
            
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Add your Skills (by clicking on add button)
          </Typography>
          <Input
            onChange={e=>{
               setSkill(e.target.value);
            }}
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Button onClick={(e)=>{
            e.persist();
            addSkill();
          }} className=" w-12" color="blue" >
          add up
        </Button>
        </div>
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree the
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />

        <Button onClick={async()=>{
            await axios.put("http://localhost:3000/api/v1/user/update",filteredData,{
                headers:{
                    Authorization: "Bearer "+ localStorage.getItem("token")
                }
            })
            alert("Update successfull");
            navigate("/profilepage?id="+id+"&name="+name);   
        }
         
      }
        className="mt-6" color="blue" fullWidth>
          Update
        </Button>
        
      </form>
    </Card></div>
  

            </div>
            </div>
    </div>
}

function Gender({prop}){
    if(prop == 'Male'){
        return<div className="flex mt-4 ml-2">
            <div className="mr-1 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gender-male" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8"/>
</svg></div>
<div >Male</div>
        </div>
    }
    else if(prop == 'Female'){
        return <div className="flex mt-4 ml-2">
            <div className="mr-1 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gender-female" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8M3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5"/>
</svg></div>
<div >Female</div>
        </div>
    }
    else{
     return <div></div>
    }
}