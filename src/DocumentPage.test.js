import { DocumentPage } from './DocumentPage';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { comments, documents } from './data';
import { Routes, Route } from 'react-router-dom';

test('DocumentPage should get did from URL and display corresponding document', () => {
    const did = '1';
    const targetDocumentText = documents.find(document => document.did === did).content;

    render(
        <MemoryRouter initialEntries={[`/documents/${did}`]}>
            <Routes>
                <Route path='/documents/:did' element={<DocumentPage />}></Route>
            </Routes>
        </MemoryRouter>
    )

    expect(screen.queryByText(targetDocumentText)).toBeInTheDocument();
    
})

test('DocumentPage should get did from URL and display corresponding comments', () => {
    const did = '1';
    const targetCommentText = comments.find(comment => comment.did === did).content;

    render(
        <MemoryRouter initialEntries={[`/documents/${did}`]}>
            <Routes>
                <Route path='/documents/:did' element={<DocumentPage />}></Route>
            </Routes>
        </MemoryRouter>
    )

    expect(screen.queryByText(targetCommentText)).toBeInTheDocument();

})