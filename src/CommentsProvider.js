import { useState } from "react";
import { CommentsContext } from "./contexts/CommentsContext";
import { getData, postData, patchData, deleteData } from "./api";

export const CommentsProvider = ({ children }) => {
    // define state
    const [comments, setComments] = useState([]);
    const auth_token = JSON.parse(localStorage.getItem('writer')).token_auth;

    // init comments
    const initComments = async (did) => {
        const comments = await getData(`comments/${did}`, auth_token);
        
        setComments(comments);
    }

    // save comment
    const saveComment = async (wid, username, did, comment) => {
        const newComment = {
            ...comment,
            wid: wid,
            username: username,
            did: did,
        }

        await postData(`comments`, auth_token, newComment);
        initComments(did);
    }

    // edit comment
    const editComment = async (updatedComment) => {
        await patchData(`comments/${updatedComment.cid}`, auth_token, updatedComment);
        initComments(updatedComment.did);
    }

    // delete comment
    const deleteComment = async (cid) => {
        const did = comments.find(comment => comment.cid == cid).did;

        await deleteData(`comments?cid=${cid}`, auth_token);
        initComments(did);
    }

    return (
        <CommentsContext.Provider value={{comments, initComments, saveComment, editComment, deleteComment}}>
            {children}
        </CommentsContext.Provider>
    )
}