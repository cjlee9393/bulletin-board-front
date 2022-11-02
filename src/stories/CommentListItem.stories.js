import { CommentListItem } from "../CommentListItem";

export default {
    component: CommentListItem,
    title: 'Atoms/CommentListItem'
}

export const Basic = (args) => <CommentListItem {...args} />

Basic.args = {
    commentContent: '난 소설 좋아하는데'
}