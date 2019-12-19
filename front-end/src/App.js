import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Route,Link,Redirect } from 'react-router-dom'
import axios from "axios"
import Login from "./login"
import Users from "./users"
import ProtectedRoute from "./ProtectedRoute"
const App = (props) => {
const [user,setUser] = useState({
  username:"",
  password:""
})
const register = e => {
axios.post("http://localhost:5100/api/register",user)
.then(i => console.log(i))
.catch(err => console.log(err))
e.preventDefault()
}

console.log(props)
  return (
    <div>
      <Link to="/">Home</Link> 
      <Link to="/login">login</Link> 
      <ProtectedRoute exact path="/users" component={Users}/>
      <Route exact path="/login" component={Login} />
      <div>
      <form onSubmit={register}>
<input value={user.username} onChange={e =>  setUser({...user,username:e.target.value})} placeholder="username" />
<input value={user.password} onChange={e =>  setUser({...user,password:e.target.value})} placeholder="password" />
<button>register</button>
      </form>
     
      </div>
      </div>
      
  );
}

export default App;
