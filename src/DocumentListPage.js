import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { NewDocument } from "./NewDocument";
import { DocumentListHeader } from './DocumentListHeader'; 
import { DocumentList } from "./DocumentList";

import { WriterContext } from './contexts/WriterContext';
import { DocumentsContext } from "./contexts/DocumentsContext";

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
}) => {
    const { writer } = useContext(WriterContext);
    const { bid } = useParams();
    const [isWritingDocument, setIsWritingDocument] = useState(false);
    const { documents, initDocuments, saveDocument, searchDocuments } = useContext(DocumentsContext);

    useEffect(() => {
        initDocuments(bid);
    }, [bid]);

    return (
        <DocumentListPageBase>
            {isWritingDocument && 
                <NewDocument
                    onClickCancel={() => setIsWritingDocument(false)}
                    onClickSave={(documentname, content) => {
                        saveDocument(writer.wid, bid, documentname, content);
                        setIsWritingDocument(false);
                    }}
            />}
            <DocumentListContainer>
                <DocumentListHeader
                    onClickWrite={() => setIsWritingDocument(true)}
                    onClickSearch={(searchText) => searchDocuments(searchText)}
                />
                <DocumentList 
                    documents={documents}
                />
            </DocumentListContainer>
        </DocumentListPageBase>
    )
}