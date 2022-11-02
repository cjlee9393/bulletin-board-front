import { DocumentListItem } from "../DocumentListItem";
import { documents } from "../data";

export default {
    component: DocumentListItem,
    title: 'Atoms/DocumentListItem'
}

export const Basic = (args) => <DocumentListItem {...args} />

Basic.args = {
    document: documents[0],
}