import { DocumentPage } from './DocumentPage';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { comments, documents, writers } from './data';
import { Routes, Route } from 'react-router-dom';
import { renderWithContext } from './test-utils/renderers';

localStorage.setItem('writer', JSON.stringify({
    password: "password",
    point: 1,
    token_auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3cml0ZXIiOnsid2lkIjoyLCJ1c2VybmFtZSI6ImNqbGVlOTMiLCJwYXNzd29yZCI6InBhc3N3b3JkIiwicG9pbnQiOjF9LCJpYXQiOjE2Njk0MjU3MjN9.flPl6pbYNgxz_LXey0B94Wxdj9In1nexRb4SxDtGZcc",
    username: "cjlee93",
    wid: 2,
}))

test('DocumentPage should get did from URL and display corresponding document', () => {
    const did = '1';
    const targetDocumentText = documents.find(document => document.did == did).content;

    renderWithContext(
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
    const targetCommentText = comments.find(comment => comment.did == did).content;

    renderWithContext(
        <MemoryRouter initialEntries={[`/documents/${did}`]}>
            <Routes>
                <Route path='/documents/:did' element={<DocumentPage />}></Route>
            </Routes>
        </MemoryRouter>
    )

    expect(screen.queryByText(targetCommentText)).toBeInTheDocument();

})

test('click on delete button removes comment from screen', () => {
    const did = '1';
    const targetCommentText = comments.find(comment => comment.did == did).content;

    renderWithContext(
        <MemoryRouter initialEntries={[`/documents/${did}`]}>
            <Routes>
                <Route path='/documents/:did' element={<DocumentPage />}></Route>
            </Routes>
        </MemoryRouter>
    )

    const deleteButtons = screen.getAllByText('삭제');

    for (let deleteButton of deleteButtons){
        fireEvent.click(deleteButton);
    }
    
    expect(screen.queryByText(targetCommentText)).toBeNull();
    localStorage.setItem('comments', JSON.stringify(null));
})

test('click on delete button removes comment from local storage', () => {
    const did = '1';
    const targetCommentText = comments.find(comment => comment.did == did).content;

    renderWithContext(
        <MemoryRouter initialEntries={[`/documents/${did}`]}>
            <Routes>
                <Route path='/documents/:did' element={<DocumentPage />}></Route>
            </Routes>
        </MemoryRouter>
    )

    const deleteButtons = screen.getAllByText('삭제');

    for (let deleteButton of deleteButtons){
        fireEvent.click(deleteButton);
    }

    const localStorageComments = JSON.parse(localStorage.getItem('comments'));

    for (let comment of localStorageComments){
        expect(comment.content.localeCompare(targetCommentText) != 0).toBeTruthy();
    }
})

test('write new comment display the new comment', () => {
    const did = '1';
    localStorage.setItem('writer', JSON.stringify(writers[0]));
    
    renderWithContext(
        <MemoryRouter initialEntries={[`/documents/${did}`]}>
            <Routes>
                <Route path='/documents/:did' element={<DocumentPage />}></Route>
            </Routes>
        </MemoryRouter>
    )

    fireEvent.click(screen.getByText('댓글쓰기'))

    const contentInputElement = screen.getByRole('content-input');

    fireEvent.change(contentInputElement, {target: { value: '새로운 댓글' }});
    fireEvent.click(screen.getByText('저장'));

    expect(screen.getByText('새로운 댓글')).toBeInTheDocument();
})

test('write edit comment display and save to localStorage the edited comment', () => {
    const did = '1';
    localStorage.setItem('writer', JSON.stringify(writers[0]));
    
    renderWithContext(
        <MemoryRouter initialEntries={[`/documents/${did}`]}>
            <Routes>
                <Route path='/documents/:did' element={<DocumentPage />}></Route>
            </Routes>
        </MemoryRouter>
    )

    const editButtons = screen.getAllByText('수정');
    fireEvent.click(editButtons[0]);

    const contentInputElement = screen.getByRole('content-input');

    fireEvent.change(contentInputElement, {target: { value: '수정된 댓글' }});
    fireEvent.click(screen.getByText('저장'));

    const comments = JSON.parse(localStorage.getItem('comments'));

    const comment = comments.find(comment => comment.content.localeCompare('수정된 댓글') == 0);

    expect(comment.content).toMatch(/수정된 댓글/i);
    expect(screen.getByText('수정된 댓글')).toBeInTheDocument();
})