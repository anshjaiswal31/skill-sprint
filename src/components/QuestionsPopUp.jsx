import React from 'react'
import "./QuestionsPopUp.css"
export const QuestionsPopUp = (props) => {
  return (props.trigger) ? (
    <div className='popup'>
        <div className='popup-inner'> 
          {props.children}
          <button onClick={()=>props.setTrigger(false)} className="close-btn">x</button>
        </div>
    </div>
  ) :"";
}
