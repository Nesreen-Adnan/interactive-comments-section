import './App.scss';
import {useContext, useEffect} from "react";
import {GlobalInfo} from './context/GlobalInfo';
import CommentsComponent from './components/CommentsComponent/CommentsComponent';
import AddComment from './components/AddComment/AddComment';
import { updateTime } from './functions';
export default function App() {
  let {comments, setComments} = useContext(GlobalInfo);
  useEffect(() => {
    setInterval(() => {
      let comments = updateTime();
      setComments(comments);
      window.localStorage.setItem("comments", JSON.stringify(comments));
    }, 5000);
  },[])
  return (
    <div className="comments">
      <CommentsComponent commentsInfo={comments} arranging="true"/>
      <AddComment />
    </div>
  )
}
