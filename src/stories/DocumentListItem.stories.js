import { DocumentListItem } from "../DocumentListItem";

export default {
    component: DocumentListItem,
    title: 'Atoms/DocumentListItem'
}

export const Basic = (args) => <DocumentListItem {...args} />

Basic.args = {
    documentName: 'Storybook default export',
}