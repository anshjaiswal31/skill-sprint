import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./CSS/Signup.css"
function Signup() {
  const history = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [adminCheck, setadminCheck] = useState(false)
  async function submit(e) {
    e.preventDefault();
    // let data = {
    //   name: name,
    //   email: email,
    //   password: password,
    //   phoneNo: phoneNo,
    //   adminCheck: adminCheck
    // }
    try {
      await axios.post(process.env.REACT_APP_BACKENDURL + "signup", { name, email, password, phoneNo, adminCheck })
        .then(res => {
          if (res.data === "user" || res.data === "admin")
            history("/login", { state: { id: email } })
          else
            alert(res.data)
        })
        .catch(e => {
          alert("Wrong Details", e)
        })
    }
    catch (e) {
      console.log("Error", e);
    }
  }
    return (
      <div className='signup'>
        <form className='form' action="POST">
          <h1 className='heading1'>Welcome to Skill Sprint</h1>
          <input className='input' type="string" onChange={(e) => { setName(e.target.value) }} placeholder='Name' /><br />
          <input className='input' type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' /><br />
          <input className='input' type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder='Pasword' /><br />
          <input className='input' type="string" onChange={(e) => { setPhoneNo(e.target.value) }} placeholder='Phone Number' /><br />
          <span className='texts'>Admin Signup?</span>
          <input className='check-box' type="checkbox" onChange={(e) => { setadminCheck(e.target.value) }} /><br />
          <br />
          <input className='submitbutton' type="submit" onClick={submit} /><br />
          <br />
          <Link className='link' to="/">Sign Up with Google</Link>
          <br />
          <Link className='link' to="/login">Already registered?</Link>
        </form>
      </div>
    )
  }
  export default Signup
