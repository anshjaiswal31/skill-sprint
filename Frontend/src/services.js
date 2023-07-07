import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import login from './features/userSlice'

export const PasswordChangeService = async (data) => {
    const { currentPassword, password, confirmPassword, email, adminCheck } = data;
    try {
        if (currentPassword === password)
            alert ("Your new password can't be same as old password")
        else if (password !== confirmPassword)
            alert("The new passwords don't match")
        else {
            await axios.post(process.env.REACT_APP_BACKENDURL + "changepw", { email, currentPassword, password, adminCheck })
                .then(res => {
                    alert(res.data)
                })
                .catch(e => {
                    alert("Wrong Details", e)
                })
        }
    }
    catch (e) {
        console.log("Error", e);
    }
};


export const UpdateDataService = async (data) => {
    const { name, email, phoneNo, adminCheck } = data
    try {
        const res= await axios.post(process.env.REACT_APP_BACKENDURL + "edit", { name, email, phoneNo, adminCheck })
        console.log(res,"here")
        return res.data    
    }
    catch (e) {
        return ("Error", e)
    }
};

export const SubmitLoginService = async (data) => {
    let history = useNavigate()
    const { email, password, adminCheck } = data;
    const dispatch = useDispatch();
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
                alert("Wrong Input "+e)
            })
    }
    catch (e) {
        console.log(e);
    }
};

export const SubmitSignupService = async (data) => {
    let history = useNavigate()
    const {name,email, password,phoneNo, adminCheck } = data;
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