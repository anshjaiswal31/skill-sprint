import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Multiselect } from 'multiselect-react-dropdown'
const selectedskills=[]

export const JobDetails = () => {
    const history = useNavigate()
    const schema = yup.object().shape({
        // requiredSkillset: yup.string().required(),
        dueDate: yup.date().required(),
        description: yup.string().required(),
        title: yup.string().required(),
        ctcLakhs: yup.number().positive().required(),
        jobType: yup.string().required().oneOf(['onsite', 'remote']),
        location: yup.string()
    });

    let skills = [
        { Skill: 'Java' },
        { Skill: 'C++' },
        { Skill: 'Javascript' },
        { Skill: 'DBMS' },
        { Skill: 'HTML'},
        { Skill: 'Css'},
        { Skill: 'Python'},
        { Skill: 'C#' },
        { Skill: 'OOPS'},
    ];
    const [options] = useState(skills);

    const [formData, setformData] = useState({
        jobType: "",
    })
    const [questionList, setQuestionList] = useState([{ question: "" }]);
    // console.log(questionList);
    // console.log(formData);
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
        // console.log(data);
        data["formQuestions"] = questionList
        // console.log("hello",skilllList)

        data["requiredSkillset"]=selectedskills
        console.log(data);
        try {
            await axios.post("http://localhost:3000/jobdetails", {data})
                .then(res => {
                    if (res.data === "checked") {
                        history("/", { state: { id: data.title } })
                    }
                })
                .catch(e => {
                    alert("Wrong Details")
                    console.log("errrr", e)
                })
        }
        catch (e) {
            console.log("Error", e);
        }
    }
    
    const onSelect=(selectedList, selectedItem)=>
    {
        selectedskills.push(selectedItem)
        // console.log(selectedskills)
    }
    return (

        <div>
            <h3>Job Details</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h4>Requried Skillset : </h4>
                <div>
                    {/* {...register("requiredSkillset")}> */}
                    <div className='SkillsDropDown'>
                        <Multiselect options={options} displayValue='Skill' onSelect={onSelect} />
                    </div>
                </div>
                {/* <input type='text' placeholder='Required Skillset' {...register("requiredSkillset")} /> */}
                <h4>Due Date : </h4>
                <input type='date' placeholder='Due Date' {...register("dueDate")} />
                <h4>Description : </h4>
                <textarea placeholder='Description' {...register("description")} />
                <h4>Title : </h4>
                <input type='text' placeholder='Job Title' {...register("title")} />
                <h4>CTC (in Lakhs): </h4>
                <input type='number' placeholder='CTC in Lakhs' {...register("ctcLakhs")} />
                <h4>Job Type : </h4>

                <input type='radio' name='jobType' value='onsite' {...register("jobType")}
                    onChange={handleChange}
                // checked={formData.JobType=='onsite'}
                />
                <label>Onsite : </label>

                <input type='radio' name='jobType' value='remote' {...register("jobType")}
                    onChange={handleChange}
                // checked={formData.JobType=='remote'}
                />
                <label>Remote : </label>


                <h4>Location : </h4>
                <input type='text' placeholder='Location' {...register("location")} />

                <h4 htmlFor='question'>Question(s)</h4>
                {questionList.map((singleQuestion, index) => (
                    <div key={index} className='questions'>
                        <div className='add-question'>
                            <input name='question' type='text' id='question' required
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

                <button className="btn btn-default" type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default JobDetails
