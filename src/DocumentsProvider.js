import { useState } from "react";
import { v4 as uuid } from 'uuid';

import { DocumentsContext } from "./contexts/DocumentsContext";
import { documents as initialDocuments } from "./data";
import { getData, postData, patchData, deleteData } from "./api";

const auth_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3cml0ZXIiOnsid2lkIjoxMiwidXNlcm5hbWUiOiJuZXdDamxlZTkzIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsInBvaW50IjowfSwiaWF0IjoxNjY3NDQ4Nzg3fQ.LywzkBQRtJppqkOPEfHV-Tf1zE9-rL871HYhTMgDyI4"

export const DocumentsProvider = ({ children }) => {
    // define state
    const [documents, setDocuments] = useState([]);

    // init documents
    const initDocuments = async (bid) => {
        const documents = await getData(`documents/${bid}`, auth_token)
        
        setDocuments(documents);
    }

    const selectDocument = (did) => {
        return documents.find(document => document.did == did)
    }

    // save documents
    const saveDocument = async (wid, bid, documentname, content) => {
        const document = {
            wid: wid,
            bid: bid,
            did: uuid(),
            documentname: documentname,
            content: content,
        }
        
        await postData('documents', auth_token, document);
        initDocuments(bid);
    }

    // search documents
    const searchDocuments = (searchText) => {
        setDocuments(
            documents.filter(document => document.documentname.includes(searchText))
        )
    }

    // edit documents
    const editDocument = async (selectedDocument, documentname, content) => {
        const updatedDocument = {
            ...selectedDocument,
            documentname: documentname,
            content: content,
        }

        await patchData(`documents/${updatedDocument.did}`, auth_token, updatedDocument);
        initDocuments(updatedDocument.bid);
    }

    // delete documents
    const deleteDocument = async (selectedDocument) => {
        const bid = documents.find(document => document.did == selectedDocument.did).bid
        
        await deleteData(`documents?did=${selectedDocument.did}`, auth_token);
        initDocuments(bid);
    }

    return (
        <DocumentsContext.Provider value={{documents, initDocuments, selectDocument, saveDocument, searchDocuments, editDocument, deleteDocument}}>
            {children}
        </DocumentsContext.Provider>
    )
}