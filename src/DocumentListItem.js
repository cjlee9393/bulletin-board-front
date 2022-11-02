import styled from "styled-components"

const DocumentListItemBase = styled.div`
`

export const DocumentListItem = ({ documentName }) => {
    return (
        <DocumentListItemBase>{documentName}</DocumentListItemBase>
    )
}