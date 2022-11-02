import { Router, BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";

export const renderWithRouter = (children, history = createMemoryHistory(), options) => {
    
    render(
        <Router location={history.location} navigator={history}>
            {children}
        </Router>,
        options
    )
}