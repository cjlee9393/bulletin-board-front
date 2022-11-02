import { DocumentList } from "../DocumentList";
import { documents } from "../data";

export default {
    component: DocumentList,
    title: 'Atoms/DocumentList'
}

export const Basic = (args) => <DocumentList {...args} />

Basic.args = {
    documents: documents,
}