import { Router, BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { DocumentsProvider } from '../DocumentsProvider';
import { CommentsProvider } from '../CommentsProvider';
import { WriterProvider } from "../WriterProvider";

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
        <WriterProvider>
        <DocumentsProvider>
        <CommentsProvider>
            {children}
        </CommentsProvider>
        </DocumentsProvider>
        </WriterProvider>
    )
}

export const renderWithRouterAndContext = (children, history = createMemoryHistory(), options) => {
    render(
        <Router location={history.location} navigator={history}>
            <WriterProvider>
            <DocumentsProvider>
            <CommentsProvider>
                {children}
            </CommentsProvider>
            </DocumentsProvider>
            </WriterProvider>
        </Router>,
        options
    )
}