import { useNavigate } from "react-router-dom";
import { DocumentListHeader } from './DocumentListHeader'; 
import { DocumentList } from "./DocumentList";
import { useEffect, useState } from "react";
import { documents as initialDocuments } from './data';
import styled from "styled-components";

const DocumentListPageBase = styled.div`
    height: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ccc;
`

const DocumentListContainer = styled.div`
    width: 900px;
`

export const DocumentListPage = ({
    bid
}) => {
    const navigate = useNavigate();
    const [documents, setDocuments] = useState(initialDocuments);

    // useEffect(() => {
    //     // <to-be-updated>
    //     setDocuments(initialDocuments);
        
    // }, []);

    return (
        <DocumentListPageBase>
            <DocumentListContainer>
                <DocumentListHeader
                    onClickWrite={() => {
                        navigate(`/write-document/${bid}`)
                    }}
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