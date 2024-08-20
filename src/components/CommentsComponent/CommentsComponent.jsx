import CommentBox from "../CommentBox/CommentBox";
import { GlobalInfo } from "../../context/GlobalInfo";
import { useContext } from "react";
import CommentInfoProvider from "../../context/CommentInfo";
export default function CommentsComponent({commentsInfo, arranging}) {
  let {username} = useContext(GlobalInfo), 
  arrangingComments = () => {
    let comments = arranging?[]:commentsInfo,
      length = commentsInfo.length;
    if(arranging) {
      for (let i = 0; i < length; i++) { 
        let maxScore = commentsInfo[0].score,
          index = 0;
        for(let j = 1; j < commentsInfo.length; j++) {
          if (commentsInfo[j].score > maxScore) {
            maxScore = commentsInfo[j].score, 
            index = j;
          }
        }
        comments.push(commentsInfo[index]);
        commentsInfo = commentsInfo.filter(comment => comment != commentsInfo[index]);
      }
    }
    return comments;
  },
  comments = arrangingComments()?.map(comment => {
    let commentBox;
    if (comment.user.username == username) {
      comment.isCurrentUser = true;
      commentBox = <CommentBox id={comment.id} info={comment} score={comment.score} avatar={comment.user.image.png} name={comment.user.username} createdAt={comment.createdAt} content={comment.content} />;
    } else
      commentBox = <CommentBox id={comment.id} info={comment} score={comment.score} avatar={comment.user.image.png} name={comment.user.username} createdAt={comment.createdAt} content={comment.content}/>;
    return (
      <CommentInfoProvider key={comment.id} info={comment}>
        {commentBox}
      </CommentInfoProvider>
    )
  });
  return (
    <>{comments}</>
  )
}