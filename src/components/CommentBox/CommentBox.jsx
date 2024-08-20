import "./CommentBox.scss";
import {useContext} from "react";
import {CommentInfo} from "../../context/CommentInfo";
import VotesComponent from "../VotesComponent/VotesComponent";
import RepliesComponent from "../RepliesComponent/RepliesComponent";
import ReplyComponent from "../ReplyComponent/ReplyComponent";
import EditComponent from "../EditComponent/EditComponent";
import DelComponent from "../DelComponent/DelComponent";
import AddReply from "../AddReply/AddReply";
import EditComment from "../EditComment/EditComment";
export default function CommentComponent({info}) {
  let {reply, edit} = useContext(CommentInfo);
  return (
    <div className={`comment ${edit?'editable':''}`} id={info.id}>
      <div className="box">
        <VotesComponent info={info} />
        <div className="details">
          <div className="header justify-b">
            <div className="info flex-c">
              <img className="avatar" src={`${info.user.image.png}`} alt={info.name} />
              <div className="username bold">{info.user.username}</div>
              {info.isCurrentUser && <div className="current-user-indication light-bold">you</div>}
              <div className="createdAt">{info.createdAt}</div>
            </div>
            <div className="activities flex light-bold capitalize">
              {info.isCurrentUser ? 
                <>
                  <DelComponent id={info.id} info={info} />
                  <EditComponent info={info} />
                </>
              : <ReplyComponent replyingTo={info.name} id={info.id} />}
            </div>
          </div> 
          <div className="content">
            {edit? <EditComment info={info} />:
              <>{info.replyingTo && <span className="replying-to light-bold">@{info.replyingTo} </span>}  
              {info.content}</>
            }
          </div>
        </div>
      </div>
      {reply && <AddReply info={info} replyingTo={info.user.username} />}
      {info.replies&&info.replies != []? <RepliesComponent replies={info.replies} /> : ""}
    </div>
  );
}
