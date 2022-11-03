import { useParams } from "react-router-dom";
import { Document } from './Document';
import { CommentList } from './CommentList';
import { Button } from "./Button";
import { documents, comments } from "./data";
import styled from "styled-components";
import { useState } from "react";
import { NewComment } from './NewComment';
import { v4 as uuid } from 'uuid';

const DocumentPageBase = styled.div`
    height: 600px;
    display: flex;
    flex-direction: column;
    background-color: #ccc;
    align-items: center;
`

const DocumentPageContainer = styled.div`
    margin: auto;
    width: 900px;
`

export const DocumentPage = ({
    writer
}) => {
    const { did } = useParams();
    const [isWritingComment, setIsWritingComment] = useState(false);
    const [selectedComments, setSelectedComments] = useState(
        comments.filter(comment => comment.did === did)
    );
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
        setIsWritingComment(false);
    }

    return (
        <DocumentPageBase>
            {isWritingComment && 
                <NewComment 
                    writer={writer}
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