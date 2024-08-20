import "./AddReply.scss";
import { useContext, useRef } from "react";
import { GlobalInfo } from "../../context/GlobalInfo";
import {CommentInfo} from "../../context/CommentInfo";
export default function AddReply({info, replyingTo}) {
    let {setReply}  = useContext(CommentInfo),
        { username, avatarOfUser, comments, setComments } = useContext(GlobalInfo),
        id = Date.now(),
        textarea = useRef(), 
        comment = useRef(),
        addComment = () => {
            let content = textarea.current.value.slice(replyingTo.length + 2),
                newReply = {
                    "id": `${id}`,
                    "content": `${content}`,
                    "createdAt": 'now',
                    "createdTime": `${id}`,
                    "score": 0,
                    "replyingTo": `${replyingTo}`,
                    "user": {
                        "image": { 
                            "png": `${avatarOfUser}`,
                        },
                        "username": `${username}`
                    }
                }, 
                index = comments.indexOf(info);
            // Loop to find the index of the comment and push the reply
            for (let i = 0; i < comments.length; i++) {
                let replies = comments[i].replies;
                if (index != -1) {
                    comments[index].replies = [newReply, ...comments[index].replies];
                    break;
                } else if(replies) {
                    index = replies.indexOf(info);
                    if (index != -1) {
                        replies = comments[i].replies[index].replies || [];
                        comments[i].replies[index].replies = [newReply, ...replies];
                        break;
                    }
                }
            }
            setComments(comments);
            window.localStorage.setItem("comments", JSON.stringify(comments));
            setReply(false);
        };
    return (
        <div ref={comment} className="add-comment box">
            <img className="avatar" src={avatarOfUser} alt={`${username}'s avatar`} />
            <textarea ref={textarea} className="rounded pointer" placeholder="Add a comment..." defaultValue={replyingTo&&`@${replyingTo}, `} />
            <button className="sub-box btn rounded uppercase pointer active" onClick={addComment}>{replyingTo?"reply":"send"}</button>
        </div>
    )
}