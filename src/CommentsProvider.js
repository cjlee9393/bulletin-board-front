import { useState } from "react";
import { v4 as uuid } from 'uuid';

import { CommentsContext } from "./contexts/CommentsContext";
import { comments as initialComments } from "./data";

export const CommentsProvider = ({ children }) => {
    // define state
    const [comments, setComments] = useState([]);

    // init comments
    const initComments = (did) => {
        let localStorageComments = JSON.parse(localStorage.getItem('comments'));
        localStorageComments = (localStorageComments !== null)
                                ? localStorageComments.filter(comment => comment.did === did)
                                : initialComments.filter(comment => comment.did === did)
        
        setComments(localStorageComments);
    }

    // save comment
    const saveComment = (wid, username, did, comment) => {
        const newComment = {
            ...comment,
            cid: uuid(),
            wid: wid,
            username: username,
            did: did,
        }

        setComments([...comments, newComment]);

        let localStorageComments = JSON.parse(localStorage.getItem('comments'));
        localStorageComments = (localStorageComments !== null)
                 ? localStorageComments
                 : initialComments;

        localStorage.setItem('comments', JSON.stringify([...localStorageComments, newComment]));
    }


    // edit comment
    const editComment = (updatedComment) => {
        const updatedComments = comments.map(comment => {
            if (comment.cid === updatedComment.cid){
                return {...comment, ...updatedComment}
            }

            return comment;
        })

        setComments(updatedComments);

        let localStorageComments = JSON.parse(localStorage.getItem('comments'));
        localStorageComments = (localStorageComments !== null)
                 ? localStorageComments
                 : initialComments;

        const updatedLocalStorageComments = localStorageComments.map(comment => {
            if (comment.cid === updatedComment.cid){
                return {...comment, ...updatedComment}
            }

            return comment;
        });
        localStorage.setItem('comments', JSON.stringify(updatedLocalStorageComments));
    }

    // delete comment
    const deleteComment = (cid) => {
        const updatedComments = comments.filter(comment => comment.cid !== cid);
        setComments(updatedComments);

        let localStorageComments = JSON.parse(localStorage.getItem('comments'));
        localStorageComments = (localStorageComments !== null)
                 ? localStorageComments
                 : initialComments;

        const updatedLocalStorageComments = localStorageComments.filter(comment => comment.cid !== cid);
        localStorage.setItem('comments', JSON.stringify(updatedLocalStorageComments));
    }

    return (
        <CommentsContext.Provider value={{comments, initComments, saveComment, editComment, deleteComment}}>
            {children}
        </CommentsContext.Provider>
    )
}