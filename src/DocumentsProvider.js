import { useState } from "react";
import { v4 as uuid } from 'uuid';

import { DocumentsContext } from "./contexts/DocumentsContext";
import { documents as initialDocuments } from "./data";

export const DocumentsProvider = ({ children }) => {
    // define state
    const [documents, setDocuments] = useState([]);

    // init documents
    const initDocuments = (bid) => {
        let localStorageDocuments = JSON.parse(localStorage.getItem('documents'));
        localStorageDocuments = (localStorageDocuments !== null)
                                ? localStorageDocuments
                                : initialDocuments
        
        setDocuments(
            localStorageDocuments.filter(document => document.bid === bid)
        )
    }

    // save documents
    const saveDocument = (wid, bid, documentname, content) => {
        const document = {
            wid: wid,
            bid: bid,
            did: uuid(),
            documentname: documentname,
            content: content,
        }

        setDocuments([...documents, document]);
        localStorage.setItem('documents', JSON.stringify([...documents, document]));
    }

    // search documents
    const searchDocuments = (searchText) => {
        setDocuments(
            documents.filter(document => document.documentname.includes(searchText))
        )
    }

    // edit documents
    const editDocument = (selectedDocument, documentname, content) => {
        const updatedDocument = {
            ...selectedDocument,
            documentname: documentname,
            content: content,
        }

        const updatedDocuments = documents.map(document => {
            if (document.did === updatedDocument.did) return updatedDocument
            
            return document
        })

        setDocuments(updatedDocuments);
        localStorage.setItem('documents', JSON.stringify(updatedDocuments));
    }

    // delete documents
    const deleteDocument = (selectedDocument) => {
        const updatedDocuments = documents.filter(document => document.did != selectedDocument.did)
        setDocuments(updatedDocuments);
        localStorage.setItem('documents', JSON.stringify(updatedDocuments));
    }

    return (
        <DocumentsContext.Provider value={{documents, initDocuments, saveDocument, searchDocuments, editDocument, deleteDocument}}>
            {children}
        </DocumentsContext.Provider>
    )
}