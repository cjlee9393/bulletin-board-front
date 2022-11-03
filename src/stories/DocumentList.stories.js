import { DocumentList } from "../DocumentList";
import { documents } from "../data";
import { MemoryRouterDecorator } from "./decorators/RouteDecorator";

export default {
    component: DocumentList,
    title: 'Atoms/DocumentList',
    decorators: [MemoryRouterDecorator],
}

export const Basic = (args) => <DocumentList {...args} />

Basic.args = {
    documents: documents,
}