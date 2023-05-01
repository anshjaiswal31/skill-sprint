import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
  const history = useNavigate()
  const [name,setName]= useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNo, setPhoneNo]=useState('')

  async function submit(e) {
    e.preventDefault();
 
    try {
      await axios.post("http://localhost:3000/signup", { name,email, password,phoneNo })
        .then(res => {
          if(res.data==="invalidname"){
            alert("Enter your name please")
          }
          else if(res.data==="invalidemail"){
            alert("Enter a valid email address")
          }
          else if(res.data==="invalidpw")
          {
            alert("The password must contain atleast 8 characters including 1 letter and 1 number")
          }
          else if(res.data==="invalidnumber")
          {
            alert("Enter a valid phone number.")
          }
          else if (res.data === "exist") {
            alert("User already registered")
          }
          else if (res.data === "notexist") {
            history("/", { state: { id: email } })
          }
        })
        .catch(e => {
          alert("Wrong Details")
          console.log("errrr",e)
        })
    }
    catch (e) {
      console.log("Error",e);
    }
  }
  return (
    <div className='signup'>
      <h1>Sign up</h1>

      <form action="POST">
        <input type="string" onChange={(e) => { setName(e.target.value) }} placeholder='Name' />
        <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' />
        <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder='Pasword' />
        <input type="string" onChange={(e) => { setPhoneNo(e.target.value) }} placeholder='Phone Number' />
        <input type="submit" onClick={submit} />
      </form>

      <br />
      <p>OR</p>
      <Link to="/">Sign Up with Google</Link>
    </div>
  )
}

export default Signup
