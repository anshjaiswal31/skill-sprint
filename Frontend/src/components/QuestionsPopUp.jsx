import React, { useState } from 'react'
import "./CSS/PopUp.css"
import axios from 'axios';
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux'

export const QuestionsPopUp = (props) => {

  const [answers, setanswers] = useState(['']);
  const [jobid]=useState(props.data[1]);
  const user = useSelector(selectUser);
  const [userEmail]=useState(user.email);
  async function submit(e) {
    e.preventDefault();
    try {
      await axios.post(process.env.REACT_APP_BACKENDURL + "jobs", { answers,jobid,userEmail })
        .then(res => {
          switch (res.data) {
            case "success":
              props.setTrigger(false)
              break;
            case "empty":
              alert("All answers are compulsory")
              break;
            default:
              alert("unknown error")

          }
        })
        .catch(e => {
          alert("Wrong Details", e)
        })
    }
    catch (e) {
      console.log("Error", e);
    }
  }

  const handleAnswersChange = (index, event) => {
    const newValues = [...answers];
    newValues[index] = event.target.value;
    setanswers(newValues);
  };

  return (props.trigger) ? (
    <div className='popup'>
      <div className='popup-inner'>
        {props.children}
        <button onClick={() => props.setTrigger(false)} className="close-btn">x</button>
        {props.data[0].map((i, index) => {
          return (
            <div>
              <span>{i.question}</span><br />
              <textarea placeholder='Write here' style={{ width: 400 }} onChange={(event) => handleAnswersChange(index, event)}></textarea>
            </div>
          )
        })}
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  ) : "";

}
