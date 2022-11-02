import { NavBar } from './NavBar';
import { renderWithRouter } from './test-utils/renderers';
import { createMemoryHistory } from 'history';
import { screen, fireEvent } from '@testing-library/react';
import { boards } from './data';

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

test('Login button exists if not loggedIn', () => {
    const isLoggedIn = false;

    renderWithRouter(<NavBar isLoggedIn={isLoggedIn} boards={boards} />);

    const loginButton = screen.queryByText(/로그인/i);

    expect(loginButton).toBeInTheDocument();
})

test('Logout button exists if not loggedIn', () => {
    const isLoggedIn = true;

    renderWithRouter(<NavBar isLoggedIn={isLoggedIn} boards={boards} />);

    const logoutButton = screen.queryByText(/로그아웃/i);

    expect(logoutButton).toBeInTheDocument();
})