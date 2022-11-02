import styled from "styled-components"

const CommentListItemBase = styled.div`
    width: 800px;
    background-color: #ccc;
    margin-bottom: 1px;
    text-align: center;
`

export const CommentListItem = ({ comment }) => {    
    return (
        <CommentListItemBase>{comment.content}</CommentListItemBase>
    )
}