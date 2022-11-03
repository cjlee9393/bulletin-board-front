import { DocumentListPage } from "../DocumentListPage";
import { MemoryRouterDecorator } from "./decorators/RouteDecorator";

export default {
    component: DocumentListPage,
    title: 'Organisms/DocumentListPage',
    decorators: [MemoryRouterDecorator],
}

export const Basic = (args) => <DocumentListPage {...args} />

const bid = 1;

Basic.args = {
    bid: bid,
}