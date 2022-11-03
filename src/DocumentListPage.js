import { useNavigate } from "react-router-dom";
import { DocumentListHeader } from './DocumentListHeader'; 
import { DocumentList } from "./DocumentList";
import { useEffect, useState } from "react";
import { documents as initialDocuments } from './data';
import styled from "styled-components";
import { v4 as uuid } from 'uuid';
import { NewDocument } from "./NewDocument";

const DocumentListPageBase = styled.div`
    height: 600px;
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
    bid,
    writer,
}) => {
    const [documents, setDocuments] = useState(initialDocuments);
    const [isWritingDocument, setIsWritingDocument] = useState(false);

    // useEffect(() => {
    //     // <to-be-updated>
    //     setDocuments(initialDocuments);
        
    // }, []);

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