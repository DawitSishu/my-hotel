import { useState } from "react"
import background from "../../Assets/bgvid.mp4";
import '../Login/Login.css';
import SignUpForm from "./SignUpForm";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import NavBar from "../NavBar/NavBar";

const baseUrl = 'http://localhost:5000/api/users/signup'

const SignUp = () => {
  const [isDisabbled,setIsDisabled] = useState(false);
  const navigator = useNavigate();
  const [err,setErr] = useState('')
  const handleUserData =  async (data) => {
    setIsDisabled(true)
    console.log(data);
    try {
     setErr('')
     const response = await axios.post(baseUrl,{...data}) 
     if(response){
      navigator("/")
     }  
    } catch (error) {
     setIsDisabled(false)
     console.log(error);
  }
}
  return (
    <div>
      <NavBar />
      <div className="main">
        <video src={background} autoPlay muted loop />
        <SignUpForm err={err} onSubmit={handleUserData}/>
      </div>
    </div>
  )
}

export default SignUp;