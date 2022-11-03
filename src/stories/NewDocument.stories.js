import { NewDocument } from "../NewDocument";
import { writers } from '../data';

export default {
    component: NewDocument,
    title: 'Molecules/NewDocument'
}

export const Basic = (args) => <NewDocument {...args} />

Basic.args = {
    writer: writers[0],
    onClickCancel: () => {},
    onClickSave: () => {},
}