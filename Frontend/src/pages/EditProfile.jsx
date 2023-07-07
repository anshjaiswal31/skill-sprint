import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import "./CSS/EditProfile.css"
import { PasswordChangeService, UpdateDataService } from '../services';

function EditProfile() {
    const history = useNavigate()
    const user = useSelector(selectUser);
    const [email, setEmail] = useState(user.email)
    const [currentPassword, setCurrentPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [name, setName] = useState('')
    const [image,setImage] = useState(process.env.REACT_APP_DEFAULTIMG)
    const adminCheck = user.userType === 'admin' ? true : false;
    useEffect(() => {
        fetch(process.env.REACT_APP_BACKENDURL + "getUserData?email=" + user.email+"&adminCheck="+adminCheck, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                setName(data.data.name)
                setPhoneNo(data.data.phoneNo)
            })
    }, [])
    
    async function uploadProfile(e) {
        e.preventDefault();
        try {
            await axios.post(process.env.REACT_APP_BACKENDURL+"uploadImage", {email, image, adminCheck })
                .then(res => {
                    alert(res.data);
                })
                .catch(e => {
                    alert("ERROR : ", e)
                })
        }
        catch (e) {
            console.log("Error", e);
        }

    }

    async function update(e) {
        e.preventDefault();
        let data={
            name:name,
            email:email,
            phoneNo:phoneNo,
            adminCheck:adminCheck    
        }
        let sol=await UpdateDataService(data)
        if(sol==="Updated.")
        {
            history("/jobs", { state: { id: email } });
            
        }
         alert(sol);
        // console.log(res)
        // try {
        //     await axios.post(process.env.REACT_APP_BACKENDURL+"edit", { name, email, phoneNo, adminCheck })
        //         .then(res => {

        //             if(res.data==="Updated")
        //                 history("/profile", { state: { id: email } });
        //             alert(res.data);
        //         })
        //         .catch(e => {
        //             alert("Wrong Details", e)
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
        
        PasswordChangeService(data)
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

    function convertToBase64(e){
        var reader = new FileReader();
        
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result)
        };
        reader.onerror = error => {
            console.log("Error: ",error);
        };
    }

    return (
        <div className='editprofile'>
            <form className='form' action="POST">
                <h1 className='heading1'>Edit Profile</h1>
                <img width={150} height={150} src={image}></img>
                <br/>
                <input className='input' accept='image/*' type='file' onChange={convertToBase64}>
                </input>
                <br/>
                <button onClick={uploadProfile}>Upload</button>
                <br/>
                <br/>
                <input className='input' type="string"value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Name' /><br />
                <input className='input' type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder={user.email} />
                <br />
                <input className='input' type="string" value={phoneNo} onChange={(e) => { setPhoneNo(e.target.value) }} placeholder='Phone Number' /><br />
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
