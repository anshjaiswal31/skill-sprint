import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ReviewAppPopUp } from '../components/ReviewAppPopUp'

const AllApplications = () => {
    const params = useParams();

    const jobID = params.jobid
    const history = useNavigate()
    const [jobApplicationsData, setJobApplicationsData] = useState([])
    const [answers, setAnswers] = useState([])
    const [applicationId, setApplicationId] = useState([])
    const [buttonPopup, setButtonPopup] = useState(false);
    // const [ignore, forcedUpdate] = useReducer(x => x + 1, 0);
    useEffect(() => {
        // console.log("here", jobID)
        fetch(process.env.REACT_APP_BACKENDURL + "getjobapps?jobid=" + jobID, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("appsdata", data)
                setJobApplicationsData(data.data)
            })
    }, [])
    const update = (jobId, updatedStatus) => {
        const jobApplications = jobApplicationsData
        const jobAppIndex = jobApplications.findIndex((job) => job._id === jobId)
        jobApplications[jobAppIndex].status = updatedStatus
        setJobApplicationsData(jobApplications)
    }
    // const update = (jobId, updatedStatus)=>  {const jobApp = jobApplicationsData.find((job)=>job._id==jobId)
    // jobApp.status=updatedStatus
    // setJobApplicationsData(jobApp)
return (

    <div>
        {jobApplicationsData.map(i => {
            return (
                <div>
                    <br />
                    <span>Email ID: {i.userEmail}</span>
                    <br />
                    <span>Status: {i.status + " "}</span>
                    <br />
                    <button onClick={() => {

                        setButtonPopup(true)
                        setAnswers(i.answers)
                        setApplicationId(i._id)
                    }
                    }>Review Application</button>


                    <br />
                </div>

            )
        })}

        {buttonPopup && <ReviewAppPopUp trigger={buttonPopup} setTrigger={setButtonPopup} data={[answers, applicationId, jobID]} setUpdate={update} />}

        <br />
        <button onClick={
            () => {
                history("/jobsdashboard")
            }
        } >BACK</button>
    </div>

)
}

export default AllApplications
