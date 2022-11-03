import { Document } from "../Document";
import { documents } from '../data';

export default {
    component: Document,
    title: 'Atoms/Document'
}

export const Basic = (args) => <Document {...args} />

Basic.args = {
    document: documents[0],
}