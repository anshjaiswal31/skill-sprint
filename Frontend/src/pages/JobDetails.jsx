import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Multiselect } from 'multiselect-react-dropdown'
import "./CSS/JobDetails.css"
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';

const selectedskills = []
const selectedLocs = []
export const JobDetails = () => {
    const history = useNavigate()
    const schema = yup.object().shape({
        dueDate: yup.date().required(),
        description: yup.string().required(),
        title: yup.string().required(),
        ctcLakhs: yup.number().positive().required(),
        jobType: yup.string().required().oneOf(['onsite', 'remote']),
        location: yup.string()
    });
    const calllocapi = async () => {
        const res = await axios(process.env.REACT_APP_BACKENDURL+"getlocations", {
            method: "GET",
        })
        setLocationList(res.data.data)
    }
    const [locationList, setLocationList] = useState([]);

    useEffect(() => {
        calllocapi()
    }, [])

    const [skills, setSkills] = useState([])
    const callskillsapi = async () => {
        const res = await axios(process.env.REACT_APP_BACKENDURL+"getskills", {
            method: "GET",
        })
        setSkills(res.data.data)
        console.log(res.data.data)
    }
    useEffect(() => {
        callskillsapi()
    }, [])
    // let skills = [
    //     { Skill: 'Java' },
    //     { Skill: 'C++' },
    //     { Skill: 'Javascript' },
    //     { Skill: 'DBMS' },
    //     { Skill: 'HTML' },
    //     { Skill: 'Css' },
    //     { Skill: 'Python' },
    //     { Skill: 'C#' },
    //     { Skill: 'OOPS' },
    // ];
    // const [options] = skills;

    const [formData, setformData] = useState({
        jobType: "",
    })
    const [questionList, setQuestionList] = useState([{ question: "" }]);
    const handleQuestionAdd = () => {
        setQuestionList([...questionList, { question: "" }])
    }
    const handleQuestionRemove = (i) => {
        const list = [...questionList];
        list.splice(i, 1);
        setQuestionList(list)
    }
    const handleQuestionChange = (e, i) => {
        const { name, value } = e.target
        const list = [...questionList]
        list[i][name] = value
        setQuestionList(list)
    }

    const handleChange = event => {
        const target = event.target
        const name = target.name
        const value = target.value
        setformData({
            ...formData,
            [name]: value
        })
    }

    const { register, handleSubmit } = useForm({ resolver: yupResolver(schema), });

    async function onSubmit(data) {
        data["formQuestions"] = questionList
        data["requiredSkillset"] = selectedskills
        data["location"] = selectedLocs
        try {
            await axios.post(process.env.REACT_APP_BACKENDURL+"jobdetails", { data })
                .then(res => {
                    if (res.data === "checked") {
                        history("/jobsdashboard", { state: { id: data.title } })
                    }
                })
                .catch(e => {
                    alert("Wrong Details")
                })
        }
        catch (e) {
            console.log("Error", e);
        }
    }
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

    const onSelect = (selectedList, selectedItem) => {
        selectedskills.push(selectedItem)
    }
    const onSelectLoc = (selectedList, selectedItem) => {
        selectedLocs.push(selectedItem)
    }

    return (
        <div className='JobDetails'>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <h3>Fill in the job details</h3>
                <span className='heading'>Requried Skillsets</span>
                <div>
                    <div className='DropDown'>
                        <Multiselect className='input' options={skills} displayValue='Skill' onSelect={onSelect} />
                    </div>
                </div>
                <br />
                <span className='heading'>Due Date : </span>
                <input className='input' type='date' placeholder='Due Date' {...register("dueDate")} />
                <br />
                <br />
                <span className='heading'>Description : </span>
                <textarea className='textArea' placeholder='Description' {...register("description")} />
                <br />
                <br />
                <span className='heading'>Title : </span>
                <input className='input' type='text' placeholder='Job Title' {...register("title")} />
                <br />
                <br />
                <span className='heading'>CTC (in Lakhs): </span>
                <input className='input' type='number' placeholder='CTC in Lakhs' {...register("ctcLakhs")} />
                <br />
                <br />
                <span className='heading'>Job Type : </span>
                <input className='input' type='radio' name='jobType' value='onsite' {...register("jobType")}
                    onChange={handleChange}
                />
                <label> Onsite  </label>
                <input className='input' type='radio' name='jobType' value='remote' {...register("jobType")}
                    onChange={handleChange}
                />
                <label> Remote  </label>
                <br />
                <br />
                <span className='heading'>Location(s) : </span>
                <div>
                    <div className='DropDown'>
                        <Multiselect className='input' options={locationList} displayValue='location' onSelect={onSelectLoc} />
                    </div>
                </div>
                <span className='heading' htmlFor='question'>Question(s)</span>
                {questionList.map((singleQuestion, index) => (
                    <div key={index} className='questions'>
                        <div className='add-question'>
                            <input className='input' name='question' type='text' id='question' required
                                value={singleQuestion.question}
                                onChange={(e) => handleQuestionChange(e, index)}
                            />
                            {questionList.length - 1 === index && questionList.length < 6 && (
                                <button
                                    type='button'
                                    className='add-btn'
                                    onClick={handleQuestionAdd}>
                                    <span>+</span>
                                </button>)}
                        </div>
                        <div className='remove-question'>
                            {questionList.length > 1 && (
                                <button
                                    type="button"
                                    className='remove-btn'
                                    onClick={() => handleQuestionRemove(index)}>
                                    <span>X</span>
                                </button>)}
                        </div>
                    </div>
                ))}
                <br />
                <button className="submitbutton" type="submit">
                    Submit
                </button>

            </form>
            <button className="logoutbutton" type="button" onClick={(e) => handleLogout(e)}>
                Logout
            </button>
              
        </div>
    )
}
export default JobDetails
