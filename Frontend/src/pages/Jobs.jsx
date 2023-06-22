import React, { useEffect, useState } from 'react'
import "./CSS/Jobs.css"
import { QuestionsPopUp } from '../components/QuestionsPopUp'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'

const Jobs = () => {

  const [buttonPopup, setButtonPopup] = useState(false);
  const [jobData, setJobData] = useState([])
  const [questions, setQuestions] = useState([])
  const [order, setOrder] = useState("ASC")
  const [jobid, setJobid] = useState("")

  const user = useSelector(selectUser);
  function locations(locationss) {
    let locs = ""
    locationss.forEach((l1) => {
      locs += l1.location + ", "
    })
    return locs.substring(0, locs.length - 2)
  }
  useEffect(() => {
    fetch(process.env.REACT_APP_BACKENDURL + "getjobdata?email=" + user.email, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setJobData(data.data)
        console.log(data.data, "jobData")
      })
  }, [])

  const sorting = (col) => {
    if(order === "ASC") {
      const sorted = [...jobData].sort((a,b) =>
        a[col]> b[col]?1:-1
      );
      setJobData(sorted);
      setOrder("DSC");
    }
    else {
      const sorted = [...jobData].sort((a,b) =>
        a[col] < b[col]?1:-1
      );
      setJobData(sorted);
      setOrder("ASC");
    }
  };

  function reverseString(str) {
    return str.split('-').reverse().join('-');
  }
  return (
    <div>
      <table style={{ width: 1400 }}>
        <tr>
          <th className="table-heading" style={{ width: 250 }}>Title</th>
          <th className="table-heading">Description</th>
          <th className="table-heading" onClick={()=>sorting("dueDate")} style={{ width: 135 }}>Due-date<br />(DD-MM-YYYY)</th>
          <th className="table-heading" onClick={()=>sorting("ctcLakhs")} style={{ width: 100 }}>Estimated CTC</th>
          <th className="table-heading" style={{ width: 300, textAlign: 'center' }}>Location</th>
        </tr>
        {jobData.map(i => {

          return (

            <tr>
              <td className="title">{i.title}</td>
              <td className="table-content">{i.description}</td>
              <td className="table-content">{reverseString(i.dueDate.substring(0, 10))}</td>
              <td className="table-content">{i.ctcLakhs} LPA</td>
              <td className="table-content">{i.jobType !== 'remote' ? locations(i.location) : 'remote'}</td>
              {/* {setStatus(checkStatus(i._id, user.email))} */}
              {user && user.userType === "user" ?
                i.application.status == "pending" ? <button onClick={
                  () => {
                    setButtonPopup(true);
                    setQuestions(i.formQuestions);
                    setJobid(i._id);
                  }
                } className='submitbutton'>Apply now</button> : i.application.status : ""}
            </tr>

          )
        })}
      </table>
      {buttonPopup && <QuestionsPopUp trigger={buttonPopup} setTrigger={setButtonPopup} data={[questions, jobid]} />}
    </div>
  )
}

export default Jobs
