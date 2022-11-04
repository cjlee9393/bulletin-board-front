import { useParams } from "react-router-dom";
import { Document } from './Document';
import { CommentList } from './CommentList';
import { Button } from "./Button";
import { documents, comments } from "./data";
import styled from "styled-components";
import { useState } from "react";
import { NewComment } from './NewComment';
import { v4 as uuid } from 'uuid';
import { useWriter } from './hook-utils/hooks';

const DocumentPageBase = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #ccc;
    align-items: center;
`

const DocumentPageContainer = styled.div`
    margin: auto;
    min-width: 800px;
    max-width: 1000px;
    margin-top: 100px;
`

export const DocumentPage = ({
}) => {
    const { writer, setWriter} = useWriter();
    const { did } = useParams();
    const [isWritingComment, setIsWritingComment] = useState(false);
    const [isEditingComment, setIsEditingComment] = useState(false);

    let initialSelectedComments = JSON.parse(localStorage.getItem('comments'));
    initialSelectedComments = (initialSelectedComments !== null)
                            ? initialSelectedComments.filter(comment => comment.did === did)
                            : comments.filter(comment => comment.did === did)

    const [selectedComments, setSelectedComments] = useState(initialSelectedComments);
    const [selectedComment, setSelectedComment] = useState({});
    const selectedDocument = documents.find(document => document.did === did);

    const saveComment = (comment) => {
        const newComment = {
            ...comment,
            cid: uuid(),
            wid: writer.wid,
            username: writer.username,
            did: did,
        }

        setSelectedComments([...selectedComments, newComment]);

        let localStorageComments = JSON.parse(localStorage.getItem('comments'));
        localStorageComments = (localStorageComments !== null)
                 ? localStorageComments
                 : comments;

        localStorage.setItem('comments', JSON.stringify([...localStorageComments, newComment]));
        
        setIsWritingComment(false);
    }

    const editComment = (updatedComment) => {
        const updatedComments = selectedComments.map(comment => {
            if (comment.cid === updatedComment.cid){
                return {...comment, ...updatedComment}
            }

            return comment;
        });

        setSelectedComments(updatedComments);
        localStorage.setItem('comments', JSON.stringify(updatedComments));
        
        setIsEditingComment(false);
    }

    const deleteComment = (cid) => {
        const updatedComments = selectedComments.filter(comment => comment.cid !== cid);
        setSelectedComments(updatedComments);
        localStorage.setItem('comments', JSON.stringify(updatedComments));
    }

    const newCommentActions = [
        {actionName: '취소', onAction: () => setIsWritingComment(false)},
        {actionName: '저장', onAction: (comment) => saveComment(comment)},
    ]

    const editCommentActions = [
        {actionName: '취소', onAction: () => setIsEditingComment(false)},
        {actionName: '저장', onAction: (comment) => editComment(comment)},
    ]

    return (
        <DocumentPageBase>
            {isWritingComment && 
                <NewComment 
                    actions={newCommentActions}
                    comment={{}}
                />}
            {isEditingComment && 
                <NewComment 
                    actions={editCommentActions}
                    comment={selectedComment}
                />}
            <DocumentPageContainer>
                <Document document={selectedDocument} />
                <Button 
                    buttonText={'댓글쓰기'} 
                    onclick={() => setIsWritingComment(true)} 
                />
                <CommentList 
                    comments={selectedComments}
                    onClickDelete={deleteComment}
                    onClickEdit={(comment) => {
                        setSelectedComment(comment);
                        setIsEditingComment(true);
                    }}
                />
            </DocumentPageContainer>
        </DocumentPageBase>
    )
}