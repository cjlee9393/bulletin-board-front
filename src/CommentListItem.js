import styled from "styled-components"

const CommentListItemBase = styled.div`
    width: 800px;
    background-color: #ccc;
    padding: 15px;
    margin-bottom: 1px;
`

const UserNameWrap = styled.div`
    font: 1.1em;
    font-weight: bold;
    margin-bottom: 5px;    
`

const ContentWrap = styled.div`
`

export const CommentListItem = ({ comment }) => {    
    return (
        <CommentListItemBase>
            <UserNameWrap>{comment.username}</UserNameWrap>
            <ContentWrap>{comment.content}</ContentWrap>
        </CommentListItemBase>
    )
}