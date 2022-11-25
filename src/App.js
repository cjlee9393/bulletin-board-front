import './App.css';
import { NavBar } from './NavBar';
import { DocumentListPage } from './DocumentListPage';
import { DocumentPage } from './DocumentPage';
import { DocumentsProvider } from './DocumentsProvider';
import { CommentsProvider } from './CommentsProvider';
import { WriterProvider } from './WriterProvider';

import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { boards } from './data';
import { useEffect, useState } from 'react';
import { Login } from './Login';
import { MainPage } from './MainPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const localStorageWriter = JSON.parse(localStorage.getItem('writer'));
    const currentState = localStorageWriter !== null;

    setIsLoggedIn(currentState);
  }, [])

  if (!isLoggedIn) return (
    <WriterProvider>
      <Login setIsLoggedIn={setIsLoggedIn} />
    </WriterProvider>
  )

  return (
    <>
      <MemoryRouter initialEntries={['/']}>
        <WriterProvider>
        <CommentsProvider>
        <DocumentsProvider>
          <NavBar isLoggedIn={false} setIsLoggedIn={setIsLoggedIn} boards={boards} />
          <Routes>
              <Route path={'/'} element={<MainPage />}/>
              <Route exact path={'/boards/:bid'} element={<DocumentListPage 
                />} 
              />
              <Route exact path={'/documents/:did'} element={<DocumentPage 
                />} 
              />
          </Routes>
        </DocumentsProvider>
        </CommentsProvider>
        </WriterProvider>
      </MemoryRouter>
    </>
  );
}

export default App;
