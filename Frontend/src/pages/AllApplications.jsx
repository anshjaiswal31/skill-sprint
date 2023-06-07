import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AllApplications = () => {
    const params = useParams();
    const history = useNavigate();
    const jobID = params.jobid
    const [jobData, setJobData] = useState([])
    useEffect(() => {
        console.log("here", jobID)
        fetch(process.env.REACT_APP_BACKENDURL + "getjobapps?jobid=" + jobID, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                setJobData(data.data)
                // console.log(jobData)
            })
        
    }, [])
    return (

        <div>

            SOMETHING...
            <span>{JSON.stringify(params.jobid)}</span>
            {console.log("real", jobData)}
            <button onClick={
                () => {
                    history("/jobsdashboard")
                }
            } >BACK</button>
        </div>

    )
}

export default AllApplications
