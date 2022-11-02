import { CommentListItem } from "../CommentListItem";
import { comments } from "../data";

export default {
    component: CommentListItem,
    title: 'Atoms/CommentListItem'
}

export const Basic = (args) => <CommentListItem {...args} />

Basic.args = {
    comment: comments[0],
}