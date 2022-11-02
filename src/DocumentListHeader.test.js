import { render, screen, fireEvent } from '@testing-library/react';
import { DocumentListHeader } from './DocumentListHeader';

test('DocumentListHeader calls onClickWrite prop when write button is clicked ', () => {
    const mockFn = jest.fn();

    render (<DocumentListHeader onClickWrite={mockFn} />);

    const button = screen.getByText(/글쓰기/i);

    fireEvent.click(button);

    expect(mockFn).toHaveBeenCalled();
});

test('DocumentListHeader calls onClickSearch prop when search button is clicked ', () => {
    const mockFn = jest.fn();

    render (<DocumentListHeader onClickSearch={mockFn} />);

    fireEvent.click(screen.getByText(/검색/i));

    expect(mockFn).toHaveBeenCalled();
});