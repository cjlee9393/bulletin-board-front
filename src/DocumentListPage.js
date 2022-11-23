import { useParams } from "react-router-dom";
import { DocumentListHeader } from './DocumentListHeader'; 
import { DocumentList } from "./DocumentList";
import { useEffect, useState } from "react";
import { documents as initialDocuments } from './data';
import styled from "styled-components";
import { v4 as uuid } from 'uuid';
import { NewDocument } from "./NewDocument";
import { useWriter } from './hook-utils/hooks';

const DocumentListPageBase = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const DocumentListContainer = styled.div`
    margin: auto;
    min-width: 800px;
    max-width: 1000px;
    margin-top: 100px;
`

export const DocumentListPage = ({
    documents,
    setDocuments
}) => {
    const { writer, setWriter} = useWriter();
    const { bid } = useParams();
    const [isWritingDocument, setIsWritingDocument] = useState(false);

    useEffect(() => {
        let localStorageDocuments = JSON.parse(localStorage.getItem('documents'));
        localStorageDocuments = (localStorageDocuments !== null)
                                ? localStorageDocuments
                                : initialDocuments
        setDocuments(localStorageDocuments.filter(document => document.bid === bid));
    }, [bid]);

    const saveDocument = (documentname, content) => {
        const document = {
            did: uuid(),
            documentname: documentname,
            content: content,
        }

        setDocuments([...documents, document]);
        localStorage.setItem('documents', JSON.stringify([...documents, document]));
        setIsWritingDocument(false);
    }

    return (
        <DocumentListPageBase>
            {isWritingDocument && 
                <NewDocument
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