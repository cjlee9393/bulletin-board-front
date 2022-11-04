import { NavBar } from './NavBar';
import { renderWithRouter } from './test-utils/renderers';
import { createMemoryHistory } from 'history';
import { screen, fireEvent } from '@testing-library/react';
import { boards, writers } from './data';

test('Click on home navigates to \'/\'', () => {
    const fakeHistory = createMemoryHistory({initialEntries: ['/some-random-url']});

    renderWithRouter(<NavBar isLoggedIn={false} boards={boards}/>, fakeHistory);
  
    const homeElement = screen.getByRole('home');

    fireEvent.click(homeElement);

    expect(fakeHistory.location.pathname).toEqual('/')
});

test('Click on boardname navigates to \'/boards/:bid\'', () => {
    const fakeHistory = createMemoryHistory({initialEntries: ['/some-random-url']});

    const board = boards[0];

    renderWithRouter(<NavBar isLoggedIn={false} boards={boards} />, fakeHistory);
  
    const boardElement = screen.getByText(board.boardname);

    fireEvent.click(boardElement);

    expect(fakeHistory.location.pathname).toEqual(`/boards/${board.bid}`);
});

test('Logout button exists if loggedIn', () => {
    localStorage.setItem('writer', JSON.stringify(writers[0]));

    renderWithRouter(<NavBar boards={boards} />);

    const logoutButton = screen.queryByText(/로그아웃/i);

    expect(logoutButton).toBeInTheDocument();
})

test('Click on Logout button removes logout button from screen', () => {
    localStorage.setItem('writer', JSON.stringify(writers[0]));

    renderWithRouter(<NavBar boards={boards} />);

    fireEvent.click(screen.queryByText(/로그아웃/i));

    const logoutButton = screen.queryByText(/로그아웃/i);

    expect(logoutButton).toBeNull();
})

test('Click on Logout button removes writer information from localStorage', () => {
    localStorage.setItem('writer', JSON.stringify(writers[0]));

    renderWithRouter(<NavBar boards={boards} />);

    fireEvent.click(screen.queryByText(/로그아웃/i));

    const writer = JSON.parse(localStorage.getItem('writer'));

    expect(writer).toBeNull();
})