import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const JobsDashboard = () => {


    const [jobData, setJobData] = useState([])
    // const [jobid,setJobid]=useState("default")
    const history=useNavigate();
    useEffect(() => {
        fetch(process.env.REACT_APP_BACKENDURL + "getjobdata", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                setJobData(data.data)
                console.log("lol",jobData)
            })
    }, [])

    function locations(locationss) {
        let locs = ""
        locationss.forEach((l1) => {
            locs += l1.location + ", "
        })
        return locs.substring(0, locs.length - 2)
    }
    function reverseString(str) {
        return str.split('-').reverse().join('-');
    }
    return (
        <div>
            <table style={{ width: 1400 }}>
                <tr>
                    <th className="table-heading" style={{ width: 250 }}>Title</th>
                    <th className="table-heading" style={{ width: 135 }}>Due-date<br />(DD-MM-YYYY)</th>
                    <th className="table-heading" style={{ width: 300, textAlign: 'center' }}>Location</th>
                </tr>
                {jobData.map(i => {
                    return (

                        <tr>
                            <td className="title">{i.title}</td>
                            <td className="table-content">{reverseString(i.dueDate.substring(0, 10))}</td>
                            <td className="table-content">{i.jobType !== 'remote' ? locations(i.location) : 'remote'}</td>
                            <button onClick={
                                () => {
                                    const url="/allapplications/".concat(i._id)
                                    history(url, { state: { id: i._id } })
                                }
                            } >View all applications</button>
                        </tr>

                    )
                })}
            </table>
        </div>
    )
}

export default JobsDashboard
