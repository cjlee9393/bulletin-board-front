import { Document } from "../Document";

export default {
    component: Document,
    title: 'Atoms/Document'
}

export const Basic = (args) => <Document {...args} />

Basic.args = {
    documentName: 'Storybook default export (non-named) in combination with template as opposed to component',
    documentContent: 'But since it\'s a one page thing, I don\'t want \"Default\" to show up in the second level, but just the first level as a link.'
}