import { NavBar } from './NavBar';
import { renderWithRouterAndContext } from './test-utils/renderers';
import { createMemoryHistory } from 'history';
import { screen, fireEvent } from '@testing-library/react';
import { getData } from './api';
import { boards, writers } from './data';

localStorage.setItem('writer', JSON.stringify({
    password: "password",
    point: 1,
    token_auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3cml0ZXIiOnsid2lkIjoyLCJ1c2VybmFtZSI6ImNqbGVlOTMiLCJwYXNzd29yZCI6InBhc3N3b3JkIiwicG9pbnQiOjF9LCJpYXQiOjE2Njk0MjU3MjN9.flPl6pbYNgxz_LXey0B94Wxdj9In1nexRb4SxDtGZcc",
    username: "cjlee93",
    wid: 2,
}))

const baseUrl = "http://localhost:3000/";
const writer = localStorage.getItem('writer');

test('Click on home navigates to \'/\'', () => {
    const fakeHistory = createMemoryHistory({initialEntries: ['/some-random-url']});

    renderWithRouterAndContext(<NavBar isLoggedIn={false} boards={boards}/>, fakeHistory);
  
    const homeElement = screen.getByRole('home');

    fireEvent.click(homeElement);

    expect(fakeHistory.location.pathname).toEqual('/')
});

test('Click on boardname navigates to \'/boards/:bid\'', async () => {
    const fakeHistory = createMemoryHistory({initialEntries: ['/some-random-url']});

    const boards = await getData(baseUrl + 'boards', writer.token_auth);
    const board = boards[0];

    renderWithRouterAndContext(<NavBar isLoggedIn={false} boards={boards} />, fakeHistory);
  
    const boardElement = screen.getByText(board.boardname);

    fireEvent.click(boardElement);

    expect(fakeHistory.location.pathname).toEqual(`/boards/${board.bid}`);
});

test('Logout button exists if loggedIn', () => {
    localStorage.setItem('writer', JSON.stringify(writers[0]));

    renderWithRouterAndContext(<NavBar boards={boards} />);

    const logoutButton = screen.queryByText(/로그아웃/i);

    expect(logoutButton).toBeInTheDocument();
})

test('Click on Logout button removes logout button from screen', () => {
    localStorage.setItem('writer', JSON.stringify(writers[0]));

    renderWithRouterAndContext(<NavBar boards={boards} />);

    fireEvent.click(screen.queryByText(/로그아웃/i));

    const logoutButton = screen.queryByText(/로그아웃/i);

    expect(logoutButton).toBeNull();
})

test('Click on Logout button removes writer information from localStorage', () => {
    localStorage.setItem('writer', JSON.stringify(writers[0]));

    renderWithRouterAndContext(<NavBar boards={boards} />);

    fireEvent.click(screen.queryByText(/로그아웃/i));

    const writer = JSON.parse(localStorage.getItem('writer'));

    expect(writer).toBeNull();
})