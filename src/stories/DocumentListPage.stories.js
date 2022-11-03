import { DocumentListPage } from "../DocumentListPage";

export default {
    component: DocumentListPage,
    title: 'Organisms/DocumentListPage'
}

export const Basic = (args) => <DocumentListPage {...args} />

const bid = 1;

Basic.args = {
    bid: bid,
}