import axios from 'axios';
import React, { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./CSS/Login.css"
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';

function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [adminCheck, setadminCheck] = useState(false)

  const dispatch = useDispatch();
  async function submit(e) {
    e.preventDefault();
    try {
      await axios.post(process.env.REACT_APP_BACKENDURL + "login", { email, password, adminCheck })
        .then(res => {
          if (res.data === "admin") {
            history("/jobdetails", { state: { id: email } })
            dispatch(
              login({
                email: email,
                userType: "admin",
                loggedIn: true,
              })
            )
          }
          else if (res.data === "user") {
            dispatch(
              login({
                email: email,
                userType: "user",
                loggedIn: true,
              })
            )
            history("/jobs", { state: { id: email } })
          }
          else {
            alert(res.data);
          }
        })
        .catch(e => {
          alert("Wrong Input")
        })
    }
    catch (e) {
      console.log(e);
    }
  }
  return (
    <div className='login'>
      <form className='form' action="POST">
        <h1 className='heading1'>SKILL SPRINT</h1>
        <input className='input' type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' /><br />
        <input className='input' type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' /><br />
        <span className='texts'>Admin?</span>
        <input className='check-box' type="checkbox" onChange={(e) => {console.log(e.target.checked,"111"); setadminCheck(e.target.checked) }} /><br />
        <input className='submitbutton' type="submit" onClick={submit} />
        <br /><br />
        <Link className='link' to="/signup">Signup Page</Link><br /><br />
        <h1 className='ending'><b>We get what we d̶e̶s̶e̶r̶v̶e work for</b></h1>
      </form>
    </div>
  )
}
export default Login
