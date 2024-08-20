import "./DelComponent.scss";
import { useContext } from "react";
import { GlobalInfo } from "../../context/GlobalInfo";
import del from "../../images/icon-delete.svg";
import ActivityComponent from "../ActivityComponent/ActivityComponent";
export default function DelComponent({info}) {
  let {comments, setComments} = useContext(GlobalInfo),
    showDelComment = () => {
      let delComment = document.createElement("div"),
        container = document.createElement("div"),
        title = document.createElement("p"),
        text = document.createElement("p"),
        canselBtn = document.createElement("button"),
        delBtn = document.createElement("button");
      container.className = "container";
      delComment.classList.add("del-comment");
      title.className = "title";
      title.textContent = "Delete comment";
      text.className = "text";
      text.textContent = "Are you sure you want to delete this comment? This will remove the comment and can't be undone.";
      canselBtn.classList.add("active", "pointer");
      canselBtn.textContent = "no, cansel";
      canselBtn.onclick=e=>canselFunc(e);
      delBtn.classList.add("active", "pointer");
      delBtn.textContent = "yes, delete";
      delBtn.onclick=e=>delFunc(e);
      delComment.className = "del-comment";
      container.appendChild(title);
      container.appendChild(text);
      container.appendChild(canselBtn);
      container.appendChild(delBtn);
      delComment.appendChild(container);
      document.body.appendChild(delComment);
    }, 
    canselFunc = e => e.target.parentElement.parentElement.remove(), 
    delFunc = e => {
      let found = false,
        updatedComments = comments.map(comment => {
          if (found == false) {
            if(comment == info) {
              found = true;
            } else if (comment.replies?.indexOf(info) >= 0) {
              found = true;
              comment.replies = comment.replies.filter(reply => reply != info);
              return comment;
            } else {
              comment.replies = comment.replies?.map(reply => {
                if (reply.replies?.indexOf(info) >= 0) {
                  found = true;
                  reply.replies = reply.replies.filter(reply => reply != info);
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
      canselFunc(e);
    };
  return (
    <ActivityComponent name="del" icon={del} func={showDelComment} />
  )
}
