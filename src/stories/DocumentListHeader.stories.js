import { DocumentListHeader } from "../DocumentListHeader";

export default {
    component: DocumentListHeader,
    title: 'Atoms/DocumentListHeader'
}

export const Basic = (args) => <DocumentListHeader {...args} />

Basic.args = {
    documentName: 'Storybook default export',
}