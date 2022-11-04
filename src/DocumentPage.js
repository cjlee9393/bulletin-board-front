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

    let initialSelectedComments = JSON.parse(localStorage.getItem('comments'));
    initialSelectedComments = (initialSelectedComments !== null)
                            ? initialSelectedComments.filter(comment => comment.did === did)
                            : comments.filter(comment => comment.did === did)

    const [selectedComments, setSelectedComments] = useState(initialSelectedComments);
    const selectedDocument = documents.find(document => document.did === did);

    const saveComment = (content) => {
        const newComment = {
            cid: uuid(),
            wid: writer.wid,
            username: writer.username,
            did: did,
            content: content,
        }

        setSelectedComments([...selectedComments, newComment]);

        let localStorageComments = JSON.parse(localStorage.getItem('comments'));
        localStorageComments = (localStorageComments !== null)
                 ? localStorageComments
                 : comments;

        localStorage.setItem('comments', JSON.stringify([...localStorageComments, newComment]));
        
        setIsWritingComment(false);
    }

    return (
        <DocumentPageBase>
            {isWritingComment && 
                <NewComment 
                    onClickCancel={() => setIsWritingComment(false)}
                    onClickSave={saveComment}
                />}
            <DocumentPageContainer>
                <Document document={selectedDocument} />
                <Button 
                    buttonText={'댓글쓰기'} 
                    onclick={() => setIsWritingComment(true)} 
                />
                <CommentList comments={selectedComments} />
            </DocumentPageContainer>
        </DocumentPageBase>
    )
}