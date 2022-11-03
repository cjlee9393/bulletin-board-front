import { DocumentListItem } from "./DocumentListItem";

export const DocumentList = ({ documents }) => {
    return (
        <>
        {documents.map(document => (
            <DocumentListItem key={document.did} document={document} />
        ))}
        </>
    )
}