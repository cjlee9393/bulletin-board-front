import { DocumentListItem } from "./DocumentListItem";

export const DocumentList = ({ documents }) => {
    return (
        <>
        {documents.map(document => (
            <DocumentListItem documentName={document} />
        ))}
        </>
    )
}