import { CommentListItem } from './CommentListItem';

export const CommentList = ({ 
    comments,
    onClickEdit = () => {},
    onClickDelete = () => {},
}) => {
    return (
        <>
        {comments.map((comment) => (
            <CommentListItem key={comment.cid} comment={comment} onClickEdit={onClickEdit} onClickDelete={onClickDelete} />
        ))}
        </>
    )
}