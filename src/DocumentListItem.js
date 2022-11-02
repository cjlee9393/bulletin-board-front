import styled from "styled-components"
import { useNavigate } from "react-router-dom"

const DocumentListItemBase = styled.div`
    background-color: #ccc;
    width: 800px;
    height: 40px;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 1px;

    :hover {
        cursor: pointer;
    }
`

export const DocumentListItem = ({ document }) => {
    const navigate = useNavigate();

    return (
        <DocumentListItemBase
            onClick={() => navigate(`/documents/${document.did}`)}>
                {document.documentname}
        </DocumentListItemBase>
    )
}