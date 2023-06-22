import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
const Navbar = () => {
    const history = useNavigate()
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [email]= useState(user.email)
    const [img,setImg]=useState("");
    const [adminCheck] = useState(user.userType === 'admin' ? true : false)
    useEffect(() => {
        
        try {
            axios.get(process.env.REACT_APP_BACKENDURL + "getProfile",  {
                params: {
                  email:email,
                  adminCheck:adminCheck
                }
              })
                .then(function (response) {
                  setImg( response.data.data.image)
                })
        }
        catch (e) {
            console.log("Error", e);
        }
    },[])
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        try {
            history("/login")
        }
        catch (e) {
            console.log("Error", e);
        }
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light   ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/login">SKILL SPRINT</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Profile</a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/jobs">Job openings</Link>
                            </li>


                            {user && user.userType === "admin" ? <li className="nav-item"><Link className="nav-link active" to="/jobdetails">Add Job</Link></li> : null}

                        </ul>
                        <ul className="navbar-nav pull-right">
                        <img src={img} width={40} height={40} alt={user.email} />
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Settings
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/edit">Edit Profile</Link></li>
                                    {user && user.userType === "admin" ? <li><Link className="dropdown-item" to="/jobsdashboard">Dashboard</Link></li> : null}
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" type="button" onClick={(e) => handleLogout(e)}>Logout</a></li>
                                </ul>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
