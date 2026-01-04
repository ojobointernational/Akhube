import Header from './Header'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const [username, setUsername]= useState("");
  const [password, setPassword]= useState("");

  const navigate = useNavigate();
   useEffect(() =>{
      if(localStorage.getItem("accessToken")){
        navigate("/")
      } 
    },[navigate])

const login = async () => {
 try{
  const response =await fetch('http://172.105.34.207:8000/api/v1/token/',{
    method:'POST',
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify(
      {email:username,
       password:password,
      }),
  });
  const result = await response.json();
   
      if (response.ok) {
        //  Store in Local Storage
        localStorage.setItem("accessToken", result.access);
        localStorage.setItem("refreshToken", result.refresh);

      navigate("/");
  } else{
    alert("Invalid Credentials");
  }
  } catch(error){
    console.error("Login error:", error);
  }
};

  return (
    <div className='mt-5'>
    <Header />
    <div className ="mt-5"><b>Enter Email and Password</b></div>
    <div className="col-sm-50 ">
    <input type="text" placeholder='email' onChange={((e)=>setUsername(e.target.value))} className ="form-control" />
    <br />
    <input type="password" placeholder='password' onChange={((e)=>setPassword(e.target.value))} className ="form-control" />
    <br />
    <button className='btn btn-primary' onClick ={login}>Login</button>
    </div>
    </div>
  );
};

export default Login