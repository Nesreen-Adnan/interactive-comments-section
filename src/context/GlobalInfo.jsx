import {createContext, useState} from "react";
import data from "../data.jsx";
export const GlobalInfo = createContext(null);
export default function GlobalInfoProvider(props) {
    let username = data.currentUser.username,
        avatarOfUser = data.currentUser.image.png,
        [comments, setComments] = useState(JSON.parse(window.localStorage.getItem("comments")) || data.comments);
        // [comments, setComments] = useState(data.comments);
        // console.log(JSON.parse(window.localStorage.getItem("comments")))
    return (
        <GlobalInfo.Provider value={{username, avatarOfUser, comments, setComments}}>
            {props.children}
        </GlobalInfo.Provider>
    )
}