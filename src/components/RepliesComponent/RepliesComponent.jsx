import "./RepliesComponent.scss";
import CommentsComponent from "../CommentsComponent/CommentsComponent";
export default function RepliesComponent({replies}) {
    return (
        <div className="replies">
            <CommentsComponent commentsInfo={replies} />
        </div>
    )
}