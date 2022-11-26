import { useState } from "react";
import { v4 as uuid } from 'uuid';

import { CommentsContext } from "./contexts/CommentsContext";
import { comments as initialComments } from "./data";
import { getData, postData, patchData, deleteData } from "./api";

const auth_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3cml0ZXIiOnsid2lkIjoxMiwidXNlcm5hbWUiOiJuZXdDamxlZTkzIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsInBvaW50IjowfSwiaWF0IjoxNjY3NDQ4Nzg3fQ.LywzkBQRtJppqkOPEfHV-Tf1zE9-rL871HYhTMgDyI4"

export const CommentsProvider = ({ children }) => {
    // define state
    const [comments, setComments] = useState([]);

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