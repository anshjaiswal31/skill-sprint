import React, { useEffect,useReducer,useState } from 'react'
import "./CSS/PopUp.css"
import axios from 'axios';

export const ReviewAppPopUp = (props) => {
  const [appID]=useState(props.data[1])
  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKENDURL + "questions", {
      params: {
        jobId: props.data[2]
      }
    })
      .then(function (response) {
        console.log("res", response);
      })
  }, [])

  
  async function review(e) {
    let status=e;
    try {
      await axios.post(process.env.REACT_APP_BACKENDURL + "review", {status,appID})
        .then(res => {
          
          props.setTrigger(false);
          alert(res.data);
        })
        .catch(e => {
          alert("Wrong Details", e)
        })
    }
    catch (e) {
      console.log("Error", e);
    }
    props.setUpdate(appID,status==1?"accepted":"rejected");
  }

  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <button className='close-btn' onClick={() => props.setTrigger(false)}> x </button>

        {props.data[0].map((i, index) => {

          return (
            <div>
              <span>Answer: {i}</span><br />
            </div>
          )
        })}
        <br />

        <button className='accept-btn' 
         onClick={event => {
          review(1);
        }}>Accept</button>

        <span> </span>

        <button className='reject-btn' 
        onClick={event => {
          review(0);
        }}>Reject</button>

      </div>
    </div>
  ) : "";
}
