import React, { useEffect, useState } from 'react'
import "./CSS/Jobs.css"
import { QuestionsPopUp } from '../components/QuestionsPopUp'


const Jobs = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [jobData, setJobData] = useState([])

  function locations(locationss) {
    let locs = ""
    locationss.forEach((l1) => {
      locs += l1.location + ", "
    })
    return locs.substring(0, locs.length - 2)
  }
  useEffect(() => {
    fetch("http://localhost:3000/getjobdata", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setJobData(data.data)
        console.log(data, "jobData")
      })
  }, [])

  return (
    <div>
      <table style={{ width: 1400 }}>
        <tr>
          <th className="table-heading" style={{ width: 250 }}>Title</th>
          <th className="table-heading">Description</th>
          <th className="table-heading" style={{ width: 100 }}>Due-date</th>
          <th className="table-heading" style={{ width: 100 }}>Estimated CTC</th>
          <th className="table-heading" style={{ width: 300, textAlign: 'center' }}>Location</th>
        </tr>
        {jobData.map(i => {
          return (

            <tr>
              <td className="title">{i.title}</td>
              <td className="table-content">{i.description}</td>
              <td className="table-content">{i.dueDate.substring(0, 10)}</td>
              <td className="table-content">{i.ctcLakhs} LPA</td>
              <td className="table-content">{i.jobType !== 'remote' ? locations(i.location) : 'remote'}</td>
              <button onClick={() => setButtonPopup(true)} className='submitbutton'>Apply now</button>
              <QuestionsPopUp trigger={buttonPopup} setTrigger={setButtonPopup}/>
                
            </tr>

          )
        })}
      </table>
    </div>
  )
}

export default Jobs
