// import axios from 'axios';
import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import "./CSS/EditProfile.css"
import { PasswordChangeService, UpdateDataService } from '../services';

function EditProfile() {
    // const history = useNavigate()
    const user = useSelector(selectUser);
    const [name, setName] = useState('')
    const [email, setEmail] = useState(user.email)
    const [currentPassword, setCurrentPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const adminCheck = user.userType === 'admin' ? true : false;

    async function update(e) {
        e.preventDefault();
        let data={
            name:name,
            email:email,
            phoneNo:phoneNo,
            adminCheck:adminCheck    
        }
        UpdateDataService(data);
        // try {
        //     await axios.post(process.env.REACT_APP_BACKENDURL+"edit", { name, email, phoneNo, adminCheck })
        //         .then(res => {

        //             if(res.data==="Updated")
        //                 history("/profile", { state: { id: email } });
        //             alert(res.data);
        //         })
        //         .catch(e => {
        //             alert("Wrong Details", e)
        //             console.log("errrr", e)
        //         })
        // }
        // catch (e) {
        //     console.log("Error", e);
        // }
    }

    async function changepw(e) {
        e.preventDefault();
        
        let data={
            email:email,
            currentPassword:currentPassword,
            password:password,
            adminCheck:adminCheck,
            confirmPassword:confirmPassword
        }
        
        PasswordChangeService(data);
        // try {
        //     if (currentPassword === password)
        //         alert("Your new password can't be same as old password")
        //     else if (password !== confirmPassword)
        //         alert("The new passwords don't match")
        //     else {
        //         console.log(process.env.REACT_APP_BACKENDURL)
        //         await axios.post(process.env.REACT_APP_BACKENDURL+"changepw", { email, currentPassword, password, adminCheck })
        //             .then(res => {
        //                 alert(res.data)
        //             })
        //             .catch(e => {
        //                 alert("Wrong Details", e)
        //                 console.log("errrr", e)
        //             })
        //     }
        // }
        // catch (e) {
        //     console.log("Error", e);
        // }
    }



    return (
        <div className='editprofile'>


            <form className='form' action="POST">
                <h1 className='heading1'>Edit Profile</h1>
                <input className='input' type="string" onChange={(e) => { setName(e.target.value) }} placeholder='Name' /><br />
                <input className='input' type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder={user.email} />
                <br />

                <input className='input' type="string" onChange={(e) => { setPhoneNo(e.target.value) }} placeholder='Phone Number' /><br />
                <br />
                <button onClick={update}>Update</button>
                <br /><br /><br />
                <input className='input' type="password" onChange={(e) => { setCurrentPassword(e.target.value) }} placeholder='Current Password' /><br />
                <input className='input' type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' /><br />
                <input className='input' type="password" onChange={(e) => { setConfirmPassword(e.target.value) }} placeholder=' Confirm Password' /><br />
                <br />
                <button className="submitbutton" onClick={changepw}>Change Password</button>

            </form>
        </div>
    )
}

export default EditProfile
