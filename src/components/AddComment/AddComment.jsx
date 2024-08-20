import "./AddComment.scss";
import { useContext, useRef } from "react";
import { GlobalInfo } from "../../context/GlobalInfo";
export default function AddComment() {
  let { username, avatarOfUser, comments, setComments } = useContext(GlobalInfo),
    textarea = useRef(),
    id = Date.now(),
    addCommentFunc = () => {
      let content = textarea.current.value,
        comment = {
          "id": `${id}`,
          "content": `${content}`,
          "createdAt": 'now',
          "createdTime": `${id}`,
          "score": 0,
          "user": {
            "image": { 
                "png": `${avatarOfUser}`,
            },
            "username": `${username}`
          }
        },
      updatedComments = comments.concat(comment);
      setComments(updatedComments);
      window.localStorage.setItem("comments", JSON.stringify(updatedComments));
      textarea.current.value = "";
    };
  return (
    <div className="add-comment box">
      <img className="avatar" src={avatarOfUser} alt={`${username}'s avatar`} />
      <textarea ref={textarea} className="rounded pointer" placeholder="Add a comment..." />
      <button className="sub-box btn rounded uppercase pointer active" onClick={addCommentFunc}>send</button>
    </div>
  )
}
