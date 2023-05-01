import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className='homepage'>
            <Link to="/login">Login</Link>
            <p></p>
            <Link to="/signup">Signup</Link>
        </div>
  )
}

export default Home
