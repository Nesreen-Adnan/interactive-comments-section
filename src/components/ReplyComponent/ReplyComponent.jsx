import "./ReplyComponent.scss";
import { useContext } from "react";
import { CommentInfo } from "../../context/CommentInfo";
import ActivityComponent from "../ActivityComponent/ActivityComponent";
import replyIcon from "../../images/icon-reply.svg";
export default function ReplyComponent() {
  let {setReply} = useContext(CommentInfo);
  return (
    <ActivityComponent
      name="reply"
      icon={replyIcon}
      func={() => setReply(true)}
    />
  );
}
