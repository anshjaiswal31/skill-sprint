import axios from 'axios';
import React, { useState } from 'react'
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
      await axios.post("http://localhost:3000/login", { email, password, adminCheck })
        .then(res => {
          switch (res.data) {
            case "existadmin":
              dispatch(
                login({
                  email: email,
                  userType: "admin",
                  loggedIn:true,
                })
              )
              history("/jobdetails", { state: { id: email } })
              break;
              
            case "exist":
              dispatch(
                login({
                  email: email,
                  userType: "user",
                  loggedIn:true,
                })
              )
              history("/jobs", { state: { id: email } })
              break;
            case "incorrect":
              alert("Wrong password :')")
              break;
            case "notexist":
              alert("User is not registered")
              break;
            default:
              alert("unknown error")
          }
        })
        .catch(e => {
          alert("Wrong Input")
          console.log(e)
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
        <input className='input' type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' /><br/>
        <input className='input' type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder='Pasword' /><br />
        <span className='texts'>Admin?</span>
        <input className='check-box' type="checkbox" onChange={(e) => { setadminCheck(e.target.value) }} /><br />
        <input className='submitbutton' type="submit" onClick={submit} />
        <br /><br />
        <Link className='link' to="/signup">Signup Page</Link><br/><br/>
        <h1 className='ending'><b>We get what we d̶e̶s̶e̶r̶v̶e work for</b></h1>
      </form>


    </div>
  )
}

export default Login
