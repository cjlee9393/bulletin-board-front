import { DocumentListPage } from './DocumentListPage';
import { screen, fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import { renderWithContext } from './test-utils/renderers'
import { getDocumentRouteDecorator } from './stories/decorators/RouteDecorator';

localStorage.setItem('writer', JSON.stringify({
    password: "password",
    point: 1,
    token_auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3cml0ZXIiOnsid2lkIjoyLCJ1c2VybmFtZSI6ImNqbGVlOTMiLCJwYXNzd29yZCI6InBhc3N3b3JkIiwicG9pbnQiOjF9LCJpYXQiOjE2Njk0MjU3MjN9.flPl6pbYNgxz_LXey0B94Wxdj9In1nexRb4SxDtGZcc",
    username: "cjlee93",
    wid: 2,
}))

test('Click on \'글쓰기\' button should show NewDocument component', () => {
    const bid = 1;

    const decorator = getDocumentRouteDecorator([`/documents/${bid}`], '/documents/:bid');

    renderWithContext(
        decorator(DocumentListPage)
    )
  
    fireEvent.click(screen.getByText(/글쓰기/i));

    expect(screen.queryByText('제목')).toBeInTheDocument()
});

test('Click on search button should only display documents containing searchText', () => {
    const bid = 1;

    const decorator = getDocumentRouteDecorator([`/documents/${bid}`], '/documents/:bid');

    renderWithContext(
        decorator(DocumentListPage)
    )
  
    const inputElement = screen.getByRole('input');
    const buttonElement = screen.getByText('검색');    

    fireEvent.change(inputElement, { target: { value: 'React' }});
    fireEvent.click(buttonElement)
    fireEvent.change(inputElement, { target: { value: '' }});

    let ListItemElement = screen.queryByText(/React/i);

    expect(ListItemElement).toBeInTheDocument();

    fireEvent.change(inputElement, { target: { value: 'some-random-text-abdkfjs' } });
    fireEvent.click(buttonElement)
    fireEvent.change(inputElement, { target: { value: '' } });

    ListItemElement = screen.queryByText('some-random-text-abdkfjs');

    expect(ListItemElement).toBeNull();
});