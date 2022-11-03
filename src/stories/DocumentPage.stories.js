import { DocumentPage } from "../DocumentPage";
import { getDocumentRouteDecorator } from "./decorators/RouteDecorator";

const did = 1;
const initialEntries = [`/documents/${did}`];
const path = '/documents/:did';

const documentRouteDecorator = getDocumentRouteDecorator(initialEntries, path);

export default {
    component: DocumentPage,
    title: 'Organisms/DocumentPage',
    decorators: [documentRouteDecorator],
}

export const Basic = (args) => <DocumentPage {...args} />

Basic.args = {
}