import "./EditComment.scss";
import {useContext, useRef} from "react";
import { GlobalInfo } from "../../context/GlobalInfo";
import { CommentInfo } from "../../context/CommentInfo";
export default function EditComment({info}) {
    let {setEdit}  = useContext(CommentInfo),
        { comments, setComments } = useContext(GlobalInfo),
        textarea = useRef(),
        editFunc = () => {
            let found = false,
            content = textarea.current.value,
            updatedComments = comments.map(comment => {
                if (found == false) {
                if(comment == info) {
                    found = true;
                    comment.content = content;
                    return comment;
                } else if (comment.replies?.indexOf(info) >= 0) {
                    found = true;
                    comment.replies[comment.replies.indexOf(info)].content = content;
                    return comment;
                } else {
                    comment.replies = comment.replies?.map(reply => {
                    if (reply.replies?.indexOf(info) >= 0) {
                        found = true;
                        reply.replies[reply.replies.indexOf(info)].content = content;
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
            setEdit(false);
        };
  return (
    <>
        <textarea ref={textarea} className="rounded pointer" defaultValue={info.content} />
        <button className="sub-box btn update rounded uppercase pointer active" onClick={editFunc}>update</button>
    </>
  )
}