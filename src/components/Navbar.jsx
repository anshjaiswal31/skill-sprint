import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
const Navbar = () => 
{
    const history = useNavigate()
    const user=useSelector(selectUser);
    const dispatch = useDispatch();
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
                                <a className="nav-link active" aria-current="page"  href="#">Profile</a>
                        </li>
                            <li className="nav-item">
                                {/* <a className="nav-link active" aria-current="page" href="/loggedinuser">Job Openings</a> */}
                                <Link className="nav-link active" to="/loggedinuser">SOME</Link>
                                {/* <Link to="/loggedinuser">SOME</Link> */}
                            </li>

                            
                            {user && user.userType=="admin"?<li className="nav-item"><a className="nav-link active">Add Job</a></li>:null}
                            
                        </ul>    
                        <ul className="navbar-nav pull-right">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Settings
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Edit Profile</a></li>
                                    <li><a className="dropdown-item" href="#">Dashboard</a></li>
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
