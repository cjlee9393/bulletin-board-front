import { Router, BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { DocumentsProvider } from '../DocumentsProvider';
import { CommentsProvider } from '../CommentsProvider';

export const renderWithRouter = (children, history = createMemoryHistory(), options) => {    
    render(
        <Router location={history.location} navigator={history}>
            {children}
        </Router>,
        options
    )
}

export const renderWithContext = (children) => {
    render(
        <DocumentsProvider>
        <CommentsProvider>
            {children}
        </CommentsProvider>
        </DocumentsProvider>
    )
}