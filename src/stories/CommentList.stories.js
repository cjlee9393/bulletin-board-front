import { CommentList } from "../CommentList";

export default {
    component: CommentList,
    title: 'Atoms/CommentList'
}

export const Basic = (args) => <CommentList {...args} />

Basic.args = {
    comments: ['난 소설 좋아하는데', '난 소설 안 좋아하는데']
}