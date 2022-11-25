import { useParams } from "react-router-dom";
import { Document } from './Document';
import { CommentList } from './CommentList';
import { Button } from "./Button";
import { documents as initialDocuments, comments as initialComments } from "./data";
import styled from "styled-components";
import { useContext, useState } from "react";
import { NewComment } from './NewComment';
import { v4 as uuid } from 'uuid';
import { useWriter } from './hook-utils/hooks';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { NewDocument } from "./NewDocument";
import { DocumentsContext } from "./contexts/DocumentsContext";

const DocumentPageBase = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const DocumentPageContainer = styled.div`
    margin: auto;
    min-width: 800px;
    max-width: 1000px;
    margin-top: 100px;
`

const ButtonsWrap = styled.div`
    display: flex;
`

export const DocumentPage = ({
    documents,
    setDocuments,
}) => {
    const { writer, setWriter} = useWriter();
    const { did } = useParams();
    const navigate = useNavigate();
    const [isWritingComment, setIsWritingComment] = useState(false);
    const [isEditingComment, setIsEditingComment] = useState(false);
    const [isEditingDocument, setIsEditingDocument] = useState(false);
    const { editDocument, deleteDocument } = useContext(DocumentsContext);

    let initialSelectedComments = JSON.parse(localStorage.getItem('comments'));
    initialSelectedComments = (initialSelectedComments !== null)
                            ? initialSelectedComments.filter(comment => comment.did === did)
                            : initialComments.filter(comment => comment.did === did)

    const [selectedComments, setSelectedComments] = useState(initialSelectedComments);
    const [selectedComment, setSelectedComment] = useState({});

    let localStorageDocuments = JSON.parse(localStorage.getItem('documents'));
    localStorageDocuments = (localStorageDocuments !== null)
                            ? localStorageDocuments
                            : initialDocuments
    
    const selectedDocument = localStorageDocuments.find(document => document.did === did)
    const bid = selectedDocument.bid

    useEffect(() => {
        setDocuments(localStorageDocuments.filter(document => document.bid === bid)); 
        console.log(documents)       
    }, [bid]);

    const checkDocumentWriter = (writer, selectedDocument) => {
        return (writer.wid === selectedDocument.wid)
    }

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
                 : initialComments;

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
            {isEditingDocument &&
                <NewDocument
                    onClickCancel={() => setIsEditingDocument(false)}
                    onClickSave={(documentname, content) => {
                        editDocument(selectedDocument, documentname, content);
                        setIsEditingDocument(false);
                    }}
                    document={selectedDocument}
                />}
            <DocumentPageContainer>
                <Document document={selectedDocument} />
                <ButtonsWrap>
                    <Button 
                        buttonText={'댓글쓰기'}
                        imgFileName={'write.png'}
                        onclick={() => setIsWritingComment(true)} 
                    />
                    {checkDocumentWriter(writer, selectedDocument) &&
                        <Button 
                            buttonText={'수정'}
                            imgFileName={'edit.png'}
                            onclick={() => setIsEditingDocument(true)} 
                        />}
                    {checkDocumentWriter(writer, selectedDocument) && 
                        <Button
                            buttonText={'삭제'}
                            imgFileName={'delete.png'}
                            onclick={() => {
                                deleteDocument(selectedDocument);
                                navigate(`/boards/${bid}`);
                            }} 
                        />}
                </ButtonsWrap>
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