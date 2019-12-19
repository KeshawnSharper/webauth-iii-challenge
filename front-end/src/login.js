import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Route,Link,Redirect } from 'react-router-dom'
import axios from "axios"
const Login = (props) => {
console.log(props)
    const [user,setUser] = useState({
        username:"",
        password:""
      })
      const login = e => {
      axios.post("http://localhost:5100/api/login",user)
      .then(i => {
        
        localStorage.setItem("token",i.data.token)
        props.history.push(`/users`)
        console.log(i.data)})
      .catch(err => console.log(err))
      e.preventDefault()
      }
      
        return (
          <div>
            <form onSubmit={login}>
      <input value={user.username} onChange={e =>  setUser({...user,username:e.target.value})} placeholder="username" />
      <input value={user.password} onChange={e =>  setUser({...user,password:e.target.value})} placeholder="password" />
      <button>Log In</button>
            </form>
            </div>
            
        );
}

export default Login