import "./VotesComponent.scss";
import { useContext, useEffect, useState } from "react";
import { GlobalInfo } from "../../context/GlobalInfo.jsx";
import plus from "../../images/icon-plus.svg";
import minus from "../../images/icon-minus.svg";
export default function VotesComponent({info}) {
  let {comments, setComments} = useContext(GlobalInfo),
    [score, setScore] = useState(info.score),
    [availableToIncrease, setAvailableToIncrease] = useState(info.availableToIncrease>=0?info.availableToIncrease:1),
    [availableToDecrease, setAvailableToDecrease] = useState(info.availableToDecrease>=0?info.availableToDecrease:1),
    increase = () => {
      if (availableToIncrease) {
        setAvailableToIncrease(val => --val);
        setAvailableToDecrease(val => ++val);
        setScore(++score);
      }
    },
    decrease = () => {
      if (availableToDecrease && score != 0) {
        setAvailableToDecrease(val => --val);
        setAvailableToIncrease(val => ++val);
        setScore(--score);
      }
    };
  useEffect(() => {
    let found = false,
      updatedComments = comments.map(comment => {
        if (found == false) {
          if(comment == info) {
            found = true;
            comment.score = score;
            comment.availableToIncrease = availableToIncrease;
            comment.availableToDecrease = availableToDecrease;
            return comment;
          } else if (comment.replies?.indexOf(info) >= 0) {
            let index = comment.replies.indexOf(info);
            found = true;
            comment.replies[index].score = score;
            comment.replies[index].availableToIncrease = availableToIncrease;
            comment.replies[index].availableToDecrease = availableToDecrease;
            return comment;
          } else {
            comment.replies = comment.replies?.map(reply => {
              if (reply.replies?.indexOf(info) >= 0) {
                let index = reply.replies.indexOf(info);
                found = true;
                reply.replies[index].score = score;
                reply.replies[index].availableToIncrease = availableToIncrease;
                reply.replies[index].availableToDecrease = availableToDecrease;  
              }
              return reply;
            })
            return comment;
          }
        } else 
          return comment;
      }).filter(comment => comment != undefined);
    setComments(updatedComments);
    window.localStorage.setItem("comments", JSON.stringify(updatedComments));
  }, [score]);
  return (
    <div className="votes rounded justify-b flex">
      <img className="up pointer" src={plus} onClick={increase} />
      <span className="score light-bold">{score}</span>
      <img className="down pointer" src={minus} onClick={decrease} />
    </div>
  )
}
