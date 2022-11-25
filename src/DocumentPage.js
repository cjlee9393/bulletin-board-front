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
import { CommentsContext } from './contexts/CommentsContext';

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
}) => {
    const { writer, setWriter} = useWriter();
    const { did } = useParams();
    const navigate = useNavigate();

    const { selectDocument, editDocument, deleteDocument } = useContext(DocumentsContext);
    const { comments, initComments, saveComment, editComment, deleteComment } = useContext(CommentsContext);

    const [isWritingComment, setIsWritingComment] = useState(false);
    const [isEditingComment, setIsEditingComment] = useState(false);
    const [isEditingDocument, setIsEditingDocument] = useState(false);

    const [selectedComment, setSelectedComment] = useState({});
    const selectedDocument = selectDocument(did);

    useEffect(() => {
        initComments(did);
    }, [did]);
    

    const checkDocumentWriter = (writer, selectedDocument) => {
        return (writer.wid === selectedDocument.wid)
    }

    const newCommentActions = [
        {actionName: '취소', onAction: () => setIsWritingComment(false)},
        {actionName: '저장', onAction: (comment) => {
            saveComment(writer.wid, writer.username, did, comment);
            setIsWritingComment(false);
        }},
    ]

    const editCommentActions = [
        {actionName: '취소', onAction: () => setIsEditingComment(false)},
        {actionName: '저장', onAction: (comment) => {
            editComment(comment);
            setIsEditingComment(false);
        }},
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
                                const bid = selectedDocument.bid;
                                navigate(`/boards/${bid}`);
                            }} 
                        />}
                </ButtonsWrap>
                <CommentList 
                    comments={comments}
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