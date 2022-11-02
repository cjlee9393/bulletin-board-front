import { CommentList } from "../CommentList";
import { comments } from "../data";

export default {
    component: CommentList,
    title: 'Atoms/CommentList'
}

export const Basic = (args) => <CommentList {...args} />

Basic.args = {
    comments: comments,
}