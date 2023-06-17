import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import "./CSS/EditProfile.css"
import { PasswordChangeService, UpdateDataService } from '../services';

function EditProfile() {
    const history = useNavigate()
    const user = useSelector(selectUser);
    const [name, setName] = useState('')
    const [email, setEmail] = useState(user.email)
    const [currentPassword, setCurrentPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [image,setImage] = useState("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBWRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAAEsAAAAAQAAASwAAAAB/+0ALFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAPHAFaAAMbJUccAQAAAgAEAP/hDIFodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nIHg6eG1wdGs9J0ltYWdlOjpFeGlmVG9vbCAxMS44OCc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczp0aWZmPSdodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyc+CiAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICA8dGlmZjpYUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpYUmVzb2x1dGlvbj4KICA8dGlmZjpZUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpZUmVzb2x1dGlvbj4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wTU09J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8nPgogIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnN0b2NrOjlmODU2NzNjLTEyZDEtNDkwZS05ODZmLWIwNDFiM2Q2MzczODwveG1wTU06RG9jdW1lbnRJRD4KICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjFhYzVkYTFjLTM5ODQtNGVhNy05YTFiLWYyNzMzOTk4YTkyODwveG1wTU06SW5zdGFuY2VJRD4KIDwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwAFAwQEBAMFBAQEBQUFBgcMCAcHBwcPCwsJDBEPEhIRDxERExYcFxMUGhURERghGBodHR8fHxMXIiQiHiQcHh8e/9sAQwEFBQUHBgcOCAgOHhQRFB4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4e/8AAEQgBaAFoAwERAAIRAQMRAf/EABwAAQACAwEBAQAAAAAAAAAAAAAFBgEDBAcCCP/EADsQAQABAwICBQgJBAIDAAAAAAABAgMEBREVIQYxQVSTEiJVYXGRktETJEJScoGhscEUIzNi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")
    const adminCheck = user.userType === 'admin' ? true : false;


    async function uploadProfile(e) {
        e.preventDefault();
        try {
            await axios.post(process.env.REACT_APP_BACKENDURL+"uploadImage", {email, image, adminCheck })
                .then(res => {
                    alert(res.data);
                })
                .catch(e => {
                    alert("ERROR : ", e)
                    console.log("errrr", e)
                })
        }
        catch (e) {
            console.log("Error", e);
        }

    }

    async function update(e) {
        e.preventDefault();
        // let data={
        //     name:name,
        //     email:email,
        //     phoneNo:phoneNo,
        //     adminCheck:adminCheck    
        // }
        // let res=UpdateDataService(data)
        // if(res==="Updated")
        // {
        //     history("/profile", { state: { id: email } });
            
        // }
        // alert(res);
        try {
            await axios.post(process.env.REACT_APP_BACKENDURL+"edit", { name, email, phoneNo, adminCheck })
                .then(res => {

                    if(res.data==="Updated")
                        history("/profile", { state: { id: email } });
                    alert(res.data);
                })
                .catch(e => {
                    alert("Wrong Details", e)
                    console.log("errrr", e)
                })
        }
        catch (e) {
            console.log("Error", e);
        }
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
        console.log(e);
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);
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
