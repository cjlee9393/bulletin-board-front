import { useParams } from "react-router-dom";
import { Document } from './Document';
import { CommentList } from './CommentList';
import { Button } from "./Button";
import { documents, comments } from "./data";
import styled from "styled-components";

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

export const DocumentPage = ({}) => {
    const { did } = useParams();

    const selectedDocument = documents.find(document => document.did === did);
    const selectedComments = comments.filter(comment => comment.did === did);

    return (
        <DocumentPageBase>
            <DocumentPageContainer>
                <Document document={selectedDocument} />
                <Button buttonText={'댓글쓰기'} style={{marginTop: '10px'}} onclick={() => {}} />
                <CommentList comments={selectedComments} />
            </DocumentPageContainer>
        </DocumentPageBase>
    )
}