import './App.css';
import { NavBar } from './NavBar';
import { DocumentListPage } from './DocumentListPage';
import { DocumentPage } from './DocumentPage';

import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { boards, writers } from './data';
import { useState } from 'react';
import { Login } from './Login';
import { useWriter } from './hook-utils/hooks';

function App() {
  const {writer, setWriter} = useWriter();
  const initialState = writer !== null;

  const [isLoggedIn, setIsLoggedIn] = useState(initialState);

  if (!isLoggedIn) return (
    <Login setIsLoggedIn={setIsLoggedIn} />
  )

  return (
    <>
      <MemoryRouter initialEntries={['/documents/1']}>
        <NavBar isLoggedIn={false} boards={boards} />
        <Routes>
          <Route exact path={'/'} />
          <Route exact path={'/boards/:bid'} element={<DocumentListPage writer={writer} />} />
          <Route exact path={'/documents/:did'} element={<DocumentPage writer={writer} />} />
        </Routes>
      </MemoryRouter>
    </>
  );
}

export default App;
