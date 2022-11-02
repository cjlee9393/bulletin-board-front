import { CommentListItem } from './CommentListItem';

export const CommentList = ({ comments }) => {
    return (
        <>
        {comments.map((comment) => (
            <CommentListItem commentContent={comment} />
        ))}
        </>
    )
}