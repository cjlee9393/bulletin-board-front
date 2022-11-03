import { DocumentListPage } from './DocumentListPage';
import { screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history'
import { renderWithRouter } from './test-utils/renderers'

test('Click on \'글쓰기\' button should navigate to \'write-document/:bid\'', () => {
    const bid = 1;
    const fakeHistory = createMemoryHistory();

    renderWithRouter(<DocumentListPage bid={bid} />, fakeHistory);
  
    fireEvent.click(screen.getByText(/글쓰기/i));
  
    expect(fakeHistory.location.pathname).toEqual(`/write-document/${bid}`);
});

test('Click on search button should only display documents containing searchText', () => {
    const bid = 1;
    const fakeHistory = createMemoryHistory();

    renderWithRouter(<DocumentListPage bid={bid} />, fakeHistory);
  
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