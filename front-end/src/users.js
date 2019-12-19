import React,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Route,Link,Redirect } from 'react-router-dom'
import axios from "axios"
const Users = (props) => {

    const [users,setUsers] = useState([])
      useEffect(() => {
        axios.get("http://localhost:5100/api/users",
        {headers:{
          authorization:localStorage.getItem("token")
        }})
        .then(i => {
            setUsers(i.data)
          console.log(users)})
        .catch(err => console.log(err))
      },[])
      const logout = e => 
      {
        e.preventDefault()
        localStorage.removeItem("token")
        props.history.push("/")
      }
        return (
          <div>
           {users.map(user => <p key={`${user.id}`}>{user.username}</p>)}
           <button onClick={logout}>Log Out</button>
            </div>
            
        );
}

export default Users