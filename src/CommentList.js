import { CommentListItem } from './CommentListItem';

export const CommentList = ({ comments }) => {
    return (
        <>
        {comments.map((comment) => (
            <CommentListItem key={comment.cid} comment={comment} />
        ))}
        </>
    )
}