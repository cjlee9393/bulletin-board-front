import { authenticate, Login } from './Login';
import { render, screen, fireEvent } from '@testing-library/react';
import { renderWithContext } from './test-utils/renderers';

localStorage.setItem('writer', JSON.stringify({
    password: "password",
    point: 1,
    token_auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3cml0ZXIiOnsid2lkIjoyLCJ1c2VybmFtZSI6ImNqbGVlOTMiLCJwYXNzd29yZCI6InBhc3N3b3JkIiwicG9pbnQiOjF9LCJpYXQiOjE2Njk0MjU3MjN9.flPl6pbYNgxz_LXey0B94Wxdj9In1nexRb4SxDtGZcc",
    username: "cjlee93",
    wid: 2,
}))

test('authenticate() returns writer if valid username and password is given', () => {
    let username = '돼멜다';
    let password = 'speak-and-enter';

    let writer = authenticate(username, password);

    expect(writer).toBeTruthy();

    username = '돼멜다';
    password = 'speak-and-entering';

    writer = authenticate(username, password);

    expect(writer).toBeFalsy();
})

test('writer is saved in localStorage', () => {
    localStorage.clear();

    renderWithContext(<Login />);

    const usernameElement = screen.getByRole('username-input');
    fireEvent.change(usernameElement, {target: {value: '돼멜다'}});

    const passwordElement = screen.getByRole('password-input');
    fireEvent.change(passwordElement, {target: {value: 'speak-and-enter'}});

    const buttonElement = screen.getByText('로그인');
    fireEvent.click(buttonElement);

    const writer = JSON.parse(localStorage.getItem('writer'));
    
    expect(writer.username).toBeTruthy();
})