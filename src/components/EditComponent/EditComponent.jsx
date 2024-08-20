import "./EditComponent.scss";
import { useContext } from "react";
import { CommentInfo } from "../../context/CommentInfo";
import ActivityComponent from "../ActivityComponent/ActivityComponent";
import edit from "../../images/icon-edit.svg";
export default function EditComponent() {
  let {setEdit} = useContext(CommentInfo);
  return (
    <ActivityComponent name="edit" icon={edit} func={() => setEdit(true)} />
  )
}
