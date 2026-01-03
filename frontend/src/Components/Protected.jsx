

import { Navigate } from 'react-router-dom'

const Protected = ({children}) => {
    const user = localStorage.getItem("user-info");
    
    if(!user){
        return <Navigate to ="/login" replace/>
    }
  return children;
}

export default Protected



