import { useParams } from "react-router-dom";
import { DocumentListHeader } from './DocumentListHeader'; 
import { DocumentList } from "./DocumentList";
import { useEffect, useState } from "react";
import { documents as initialDocuments } from './data';
import styled from "styled-components";
import { v4 as uuid } from 'uuid';
import { NewDocument } from "./NewDocument";

const DocumentListPageBase = styled.div`
    height: 1000px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ccc;
`

const DocumentListContainer = styled.div`
    margin: auto;
    width: 900px;
`

export const DocumentListPage = ({
    writer
}) => {
    const { bid } = useParams();
    const [documents, setDocuments] = useState([]);
    const [isWritingDocument, setIsWritingDocument] = useState(false);

    useEffect(() => {
        setDocuments(initialDocuments.filter(document => document.bid === bid));
    }, [bid]);

    const saveDocument = (documentname, content) => {
        const document = {
            did: uuid(),
            documentname: documentname,
            content: content,
        }

        setDocuments([...documents, document]);
        setIsWritingDocument(false);
    }

    return (
        <DocumentListPageBase>
            {isWritingDocument && 
                <NewDocument
                    writer={writer}
                    onClickCancel={() => setIsWritingDocument(false)}
                    onClickSave={saveDocument}
            />}
            <DocumentListContainer>
                <DocumentListHeader
                    onClickWrite={() => setIsWritingDocument(true)}
                    onClickSearch={(searchText) => {
                        const searchedDocuments = documents.filter(document => document.documentname.includes(searchText));
                        setDocuments([...searchedDocuments]);
                    }}
                />
                <DocumentList 
                    documents={documents}
                />
            </DocumentListContainer>
        </DocumentListPageBase>
    )
}