import { NewComment } from "../NewComment";
import { writers } from '../data';

export default {
    component: NewComment,
    title: 'Molecules/NewComment'
}

export const Basic = (args) => <NewComment {...args} />

Basic.args = {
    writer: writers[0],
    onClickCancel: () => {},
    onClickSave: () => {},
}