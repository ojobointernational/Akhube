import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'



const Register = () => {
  const navigate = useNavigate() 
   useEffect(() =>{
      if(localStorage.getItem("user-info")){
        navigate("/home")
      } 
    },[navigate])
  return (
     <div>
    <Header />
    <div>Register</div>
    </div>
  )
}

export default Register