import {useState, createContext} from "react";
export const CommentInfo = createContext();
export default function CommentInfoProvider(props) {
    let [reply, setReply] = useState(false),
        [edit, setEdit] = useState(false),
        // [{]availableToIncrease, setAvailableToIncrease} = useState(1),
        // [{]availableToDecrease, setAvailableToDecrease} = useState(1),
        info = props.info;
    return (
        <CommentInfo.Provider value={{reply, setReply, edit, setEdit, info}}>
            {props.children}
        </CommentInfo.Provider>
    )
}
