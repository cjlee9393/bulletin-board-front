import { DocumentListItem } from "../DocumentListItem";
import { documents } from "../data";
import { MemoryRouterDecorator } from "./decorators/RouteDecorator"

export default {
    component: DocumentListItem,
    title: 'Atoms/DocumentListItem',
    decorators: [MemoryRouterDecorator],
}

export const Basic = (args) => <DocumentListItem {...args} />

Basic.args = {
    document: documents[0],
}